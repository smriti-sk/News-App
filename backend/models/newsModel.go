package models

import "gorm.io/gorm"

type NewsRequest struct {
	gorm.Model
	Category string `gorm:"category"`
	Country  string `gorm:"country"`
	Language string `gorm:"language"`
}

type NewsResponse struct {
	gorm.Model
	ArticleID   string `json:"article_id"`
	Title       string `json:"title"`
	Link        string `json:"link"`
	Description string `json:"description,omitempty"`
	PubDate     string `json:"pubDate"`
	ImageURL    string `json:"image_url,omitempty"`
	SourceURL   string `json:"source_url"`
	SourceIcon  string `json:"source_icon,omitempty"`
	Language    string `json:"language"`
	Country     string `json:"country"`  // Array of strings for multiple countries
	Category    string `json:"category"` // Array of strings for multiple categories
}
