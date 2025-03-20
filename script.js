let allVideos = [];
let filteredVideos = [];
let currentPage = 1;
const videosPerPage = 10;

function formatDuration(duration) {
    if (!duration) return '';
    
    duration = duration.replace('PT', '');
    
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    
    if (duration.includes('H')) {
        hours = parseInt(duration.split('H')[0]);
        duration = duration.split('H')[1];
    }
    
    if (duration.includes('M')) {
        minutes = parseInt(duration.split('M')[0]);
        duration = duration.split('M')[1];
    }
    
    if (duration.includes('S')) {
        seconds = parseInt(duration.split('S')[0]);
    }
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function formatCount(count) {
    if (!count) return '0';
    count = parseInt(count);
    
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    } else {
        return count.toString();
    }
}

function formatPublishDate(publishDate) {
    if (!publishDate) return '';
    
    const now = new Date();
    const published = new Date(publishDate);
    const diffTime = Math.abs(now - published);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) {
        return 'Today';
    } else if (diffDays < 2) {
        return 'Yesterday';
    } else if (diffDays < 30) {
        return `${diffDays} days ago`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
}

function renderVideos(videos) {
    const videosContainer = document.getElementById('videosContainer');
    videosContainer.innerHTML = '';
    
    if (videos.length === 0) {
        videosContainer.innerHTML = `
            <div class="no-results">
                <i class="far fa-frown"></i>
                <p>No videos found. Try a different search term.</p>
            </div>
        `;
        return;
    }
    
    videos.forEach(videoData => {
        const video = videoData.items;
        const snippet = video.snippet;
        const statistics = video.statistics;
        const contentDetails = video.contentDetails;
        
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.addEventListener('click', () => {
            window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
        });
        
        videoCard.innerHTML = `
            <div class="thumbnail-container">
                <img class="thumbnail" src="${snippet.thumbnails.high.url}" alt="${snippet.title}">
                <div class="duration">${formatDuration(contentDetails.duration)}</div>
            </div>
            <div class="video-info">
                <h3 class="video-title">${snippet.title}</h3>
                <p class="channel-name">${snippet.channelTitle}</p>
                <div class="video-stats">
                    <span>${formatCount(statistics.viewCount)} views</span>
                    <span>${formatPublishDate(snippet.publishedAt)}</span>
                </div>
                <div class="video-engagement">
                    <span><i class="far fa-thumbs-up"></i> ${formatCount(statistics.likeCount)}</span>
                    <span><i class="far fa-comment"></i> ${formatCount(statistics.commentCount)}</span>
                </div>
            </div>
        `;
        
        videosContainer.appendChild(videoCard);
    });
}

async function fetchVideos() {
    try {
        document.getElementById('loader').style.display = 'flex';
        
        const options = {
            method: 'GET',
            headers: {accept: 'application/json'}
        };
        
        const response = await fetch('https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10&query=javascript', options);
        const data = await response.json();
        
        document.getElementById('loader').style.display = 'none';
        
        if (data.statusCode === 200) {
            allVideos = data.data.data;
            filteredVideos = [...allVideos];
            renderVideos(filteredVideos);
        } else {
            throw new Error('Failed to fetch videos');
        }
    } catch (error) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('videosContainer').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Error fetching videos. Please try again later.</p>
            </div>
        `;
        console.error('Error fetching videos:', error);
        
    }
}

function filterVideos(searchTerm) {
    if (!searchTerm) {
        filteredVideos = [...allVideos];
    } else {
        searchTerm = searchTerm.toLowerCase();
        filteredVideos = allVideos.filter(video => {
            const title = video.items.snippet.title.toLowerCase();
            const channelTitle = video.items.snippet.channelTitle.toLowerCase();
            const description = video.items.snippet.description.toLowerCase();
            
            return (
                title.includes(searchTerm) || 
                channelTitle.includes(searchTerm) || 
                description.includes(searchTerm)
            );
        });
    }
    
    renderVideos(filteredVideos);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchVideos();
    
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    searchButton.addEventListener('click', () => {
        filterVideos(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterVideos(searchInput.value);
        }
    });
});