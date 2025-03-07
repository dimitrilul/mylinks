# Linktree Website

This project is a simple Linktree-style website that allows users to showcase their links in a visually appealing manner. The website is designed with dark mode styling for a modern look and feel.

## Project Structure

[!WARNING]
This repo is still in a pre-alpha state. Expect some issues.

```
mylinks
├── src
│   ├── index.html        # Main HTML document for the website
│   ├── css
│   │   └── style.css     # Styles for the website (dark mode)
│   ├── js
│   │   └── main.js       # JavaScript for dynamic content loading
│   └── data
│       └── profile.json  # JSON file containing user data
├── README.md             # Project documentation
└── .gitignore            # Files to ignore in version control
```

## Setup Instructions

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/dimitrilul/mylinks.git
   ```

2. Navigate to the project directory:
   ```
   cd linktree-website
   ```

3. Open `src/index.html` in your web browser to view the website.

## Usage

- Edit the `src/data/profile.json` file to update your name, description, and links.
- Customize the styles in `src/css/style.css` if desired.
- The JavaScript in `src/js/main.js` will automatically fetch and display the data from the JSON file.

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements or new features.

## License

This project is open-source and available under the MIT License.
