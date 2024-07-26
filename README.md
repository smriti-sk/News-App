# News Aggregator App

Welcome to the News Aggregator App! This is a powerful and user-friendly web-based application designed to provide you with real-time news updates from around the globe. Built using modern technologies and featuring extensive customization options, this app is your gateway to the latest news stories from thousands of sources.

## Tech Stack

- **Frontend:** Angular
- **Styling:** Tailwind CSS
- **Backend:** Golang
- **Database:** PostgreSQL
- **API Integration:** NEWSDATA.IO

## Key Features

- **Real-Time News Updates:** Access the latest news from over 57,587 global outlets.
- **Advanced Search Functionality:** Filter news by keywords, date, language, location, and publisher.
- **Multiple Categories:** Explore news organized into various categories for easier navigation.
- **Language Support:** Read news in 84 languages.
- **Global Coverage:** Stay informed with news from 198 countries.

## How It Works

The News Aggregator App utilizes the NEWSDATA.IO API to fetch and deliver real-time news updates. This application is designed to be intuitive and efficient, allowing users to search for news stories with advanced filtering options. Whether you’re interested in global headlines or specific regional news, this app has you covered.

## Screenshots

![News Aggregator App Screenshot](frontend/src/assets/Project.png)

![Laptop View](frontend/src/assets/LaptopView.png)

![Mobile View](frontend/src/assets/mobileView.png)

## Installation

To run the News Aggregator App locally, follow these steps:

1. **Clone the repository:**

   ```
   git clone https://github.com/your-repo/news-aggregator-app.git


2. **Navigate to the project directory:**
    ```
    cd news-aggregator-app

3. **Install backend dependencies:**
    ```
    cd backend
    go mod tidy

4. **Install frontend dependencies:**
    ```
    cd ../frontend
    npm install

5. **Set up environment variables:**

Create a .env file in the backend directory with the following content:
    ```
    NEWSAPI_KEY=your_newsdata_io_api_key

6. **Run the backend server:**
    ```   
    cd backend
    go run main.go

7. **Run the frontend application:**
    ``` 
    cd ../frontend
    npm start

8. **Access the application:**

Open your web browser and go to http://localhost:4200 to see the app in action.

### Contributing
I warmly welcome contributions to improve the News Aggregator App. If you have suggestions, bug reports, or new features in mind, please open an issue or submit a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Contact
For any questions or inquiries, please contact smritikumari049@gmail.com.