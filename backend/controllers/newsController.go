package controllers

import (
	"encoding/json"
	"fmt"
	"goServer/models"
	"io"
	"net/http"
	"net/url"

	"github.com/gin-gonic/gin"
)

type NewsRequestType models.NewsRequest
type NewsResponseType models.NewsResponse

// type SelectedArticle struct {
// 	ArticleID   string `json:"article_id"`
// 	Title       string `json:"title"`
// 	Link        string `json:"link"`
// 	Description string `json:"description,omitempty"`
// 	PubDate     string `json:"pubDate"`
// 	ImageURL    string `json:"image_url,omitempty"`
// 	SourceURL   string `json:"source_url"`
// 	SourceIcon  string `json:"source_icon,omitempty"`
// 	Language    string `json:"language"`
// 	Country     string `json:"country"`  // Array of strings for multiple countries
// 	Category    string `json:"category"` // Array of strings for multiple categories
// }

func GetNews(c *gin.Context) {
	// // Declare and assign API key from environment variable
	apiKey := "pub_42996d59edc3b46132812f01e1a31e5a0d5be"

	var newsRequest NewsRequestType

	if c.Bind(&newsRequest) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read req body",
		})
		return
	}

	var reqParams = ""
	if newsRequest.Category != "" {
		reqParams += "&category=" + newsRequest.Category
	}
	if newsRequest.Country != "" {
		reqParams += "&country=" + newsRequest.Country
	}
	if newsRequest.Language != "" {
		reqParams += "&language=" + newsRequest.Language
	}

	// Construct the URL using string formatting
	url := "https://newsdata.io/api/1/news?apikey=" + apiKey + reqParams

	fmt.Println("api", url)
	res, err := http.Get(url)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}

	//cloose the body
	defer res.Body.Close()

	//read all the data
	data, err := io.ReadAll(res.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}

	var originalResponse map[string]interface{}
	err = json.Unmarshal(data, &originalResponse)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}

	// var selectedArticles []NewsResponseType

	// for _, item := range originalResponse {
	// 	article := item.(map[string]interface{})
	// 	selected := NewsResponseType{
	// 		ArticleID:   article["article_id"].(string),
	// 		Title:       article["title"].(string),
	// 		Link:        article["link"].(string),
	// 		Description: article["description"].(string),
	// 		PubDate:     article["pubDate"].(string),
	// 		ImageURL:    article["image_url"].(string),
	// 		SourceURL:   article["source_url"].(string),
	// 		SourceIcon:  article["source_icon"].(string),
	// 		Language:    article["language"].(string),
	// 		// Country:     toStringSlice(article["country"]),
	// 		// Category:    toStringSlice(article["category"]),
	// 	}
	// 	selectedArticles = append(selectedArticles, selected)
	// }

	// fmt.Println("RESPONSE: ", selectedArticles)

	c.JSON(http.StatusOK, gin.H{
		// "status":       "ssseeeuccess",
		// "totalResults": len(originalResponse), // Assuming totalResults is based on original data
		"results": originalResponse["results"],
	})
}

func GetSearchedNews(c *gin.Context) {
	// You can access query parameters from the request, if any
	searchQuery := c.Query("q")
	escapedQuery := url.QueryEscape(searchQuery)
	fmt.Println("Q param: ", escapedQuery)

	// Declare and assign API key from environment variable
	apiKey := "pub_42996d59edc3b46132812f01e1a31e5a0d5be"

	// Construct the URL using the provided searchQuery parameter
	url := "https://newsdata.io/api/1/news?apikey=" + apiKey + "&q=" + escapedQuery

	// Make a GET request to the constructed URL
	res, err := http.Get(url)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	defer res.Body.Close()

	// Read the response body
	body, err := io.ReadAll(res.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to read response body",
		})
		return
	}

	// Parse the JSON response
	var responseData map[string]interface{}
	if err := json.Unmarshal(body, &responseData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to parse JSON response",
		})
		return
	}

	// Return the parsed response to the client
	c.JSON(http.StatusOK, responseData["results"])
}
