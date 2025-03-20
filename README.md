# YouTube Video Gallery

A responsive YouTube clone that displays videos in a grid layout with search functionality. Features video thumbnails, titles, channel information, and engagement metrics (views, likes, comments). Built with HTML, CSS, and JavaScript for a clean, user-friendly interface that mimics YouTube's core browsing experience.

## 📋 Features

- **Video Grid Layout**: Responsive design that adapts to different screen sizes
- **Video Cards**: Display thumbnails, titles, channel names, and video stats
- **Video Details**: Shows duration, view count, likes, and comments
- **Search Functionality**: Filter videos by title, channel name, or description
- **Client-side Filtering**: No additional API calls needed for search
- **YouTube Integration**: Click any video to open it on YouTube
- **Responsive Design**: Works on mobile, tablet, and desktop screens
- **Error Handling**: Fallback to mock data if API fails
- **Loading State**: Visual feedback during data fetching

## 🖼️ Screenshots

### Desktop View
![Desktop View](https://via.placeholder.com/800x450?text=YouTube+Clone+Desktop+View)

### Mobile View
![Mobile View](https://via.placeholder.com/300x600?text=YouTube+Clone+Mobile+View)


## 🌐 Live Demo

Check out the live demo: [YouTube Video Gallery](https://your-deployment-link-here.com)

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, etc.)
- Internet connection to load videos from the API

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Indra-photon/YouTube-Video-Listing.git
   ```

3. Open `index.html` in your browser.

## 🛠️ Technologies Used

- **HTML5**: Structure of the web page
- **CSS3**: Styling and responsive design
- **JavaScript**: Dynamic content and interactivity
- **Font Awesome**: Icons for UI elements
- **FreeAPI YouTube API**: Data source for videos

## ⚙️ API Information

The application uses the FreeAPI YouTube endpoint to fetch video data:

```
GET https://api.freeapi.app/api/v1/public/youtube/videos
```
## ⚙️ API Documentation
```
https://freeapi.hashnode.space/api-guide/apireference/getYoutubeVideos
```

Query parameters:
- `page`: Page number for pagination
- `limit`: Number of results per page
- `query`: Search term for videos
- `sortBy`: Sorting method (mostLiked, mostViewed, latest, oldest)

## 📱 Responsive Design

The application is designed to work on devices of all sizes:

- **Desktop**: Shows a grid of 3-4 videos per row
- **Tablet**: Shows 2 videos per row
- **Mobile**: Shows 1 video per row with adapted layout

## 🔍 Search Implementation

The search functionality works by:
1. Capturing user input from the search field
2. Filtering the existing video data array on the client side
3. Showing only videos that match the search term in their title, channel name, or description
4. Re-rendering the video grid with the filtered results

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
