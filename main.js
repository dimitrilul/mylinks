document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, fetching profile data...');
    loadProfileData();
});

async function loadProfileData() {
    try {
        // Get references to DOM elements
        const linksContainer = document.getElementById('links-container');
        if (!linksContainer) {
            console.error('Could not find element with ID "links-container"');
            return;
        }
        
        // Display loading message
        linksContainer.innerHTML = '<p style="text-align:center">Loading links...</p>';
        
        // Fetch and process the profile data
        const data = await fetchProfileData();
        
        // Update the UI with profile data
        updateProfileInfo(data);
        
        // Create and display links
        displayLinks(data, linksContainer);
        
        // Update footer with current year
        updateFooter();
        
    } catch (error) {
        handleError(error);
    }
}

async function fetchProfileData() {
    const response = await fetch('data/profile.json');
    console.log('Fetch response:', response.status, response.statusText);
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Data loaded successfully:', data);
    return data;
}

function updateProfileInfo(data) {
    // Update profile information
    document.getElementById('name').textContent = data.name || 'Name Not Found';
    document.getElementById('description').textContent = data.description || 'Description Not Found';
    
    // Set profile image
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
        profileImage.src = data.profileImage || 'https://via.placeholder.com/150';
        profileImage.alt = data.name || 'Profile Picture';
    }
}

function displayLinks(data, linksContainer) {
    // Clear the loading message
    linksContainer.innerHTML = '';
    
    // Create and append links
    if (data.links && data.links.length > 0) {
        data.links.forEach(link => {
            const linkElement = createLinkElement(link);
            linksContainer.appendChild(linkElement);
            console.log('Added link:', link.title);
        });
    } else {
        linksContainer.innerHTML = '<p style="text-align:center">No links found in profile data</p>';
        console.warn('No links found in the loaded data');
    }
}

function createLinkElement(link) {
    const linkElement = document.createElement('a');
    linkElement.href = link.url;
    linkElement.className = 'link';
    linkElement.target = '_blank';
    linkElement.rel = 'noopener noreferrer';
    
    // Add icon if available
    if (link.icon) {
        const iconElement = document.createElement('i');
        iconElement.className = link.icon;
        linkElement.appendChild(iconElement);
        linkElement.appendChild(document.createTextNode(' ')); // Space after icon
    }
    
    linkElement.appendChild(document.createTextNode(link.title));
    
    // Add special handling for Discord link
    if (link.title.includes('Discord')) {
        linkElement.onclick = function(event) {
            event.preventDefault();
            if (confirm('Note: I cannot create friend invite links on Discord. Please add me manually using my username @dimitrighg.\n\nContinue to Discord?')) {
                window.open(link.url, '_blank', 'noopener,noreferrer');
            }
        };
    }
    
    return linkElement;
}

function updateFooter() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function handleError(error) {
    console.error('Error loading profile data:', error);
    const linksContainer = document.getElementById('links-container');
    if (linksContainer) {
        linksContainer.innerHTML = `
            <div style="color: red; text-align: center; padding: 20px;">
                <p>Error loading links: ${error.message}</p>
                <p>Make sure the file data/profile.json exists</p>
            </div>
        `;
    }
}