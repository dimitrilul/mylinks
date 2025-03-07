document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, fetching profile data...');
    loadProfileData();
});

async function loadProfileData() {
    try {
        // Display loading message in the links container
        const linksContainer = document.getElementById('links-container');
        if (!linksContainer) {
            console.error('Could not find element with ID "links-container"');
            return;
        }
        
        linksContainer.innerHTML = '<p style="text-align:center">Loading links...</p>';
        
        // Fetch the profile data
        const response = await fetch('data/profile.json');
        console.log('Fetch response:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data loaded successfully:', data);
        
        // Update profile information
        document.getElementById('name').textContent = data.name || 'Name Not Found';
        document.getElementById('description').textContent = data.description || 'Description Not Found';
        
        // Set profile image
        const profileImage = document.getElementById('profile-image');
        if (profileImage) {
            profileImage.src = data.profileImage || 'https://via.placeholder.com/150';
            profileImage.alt = data.name || 'Profile Picture';
        }
        
        // Clear the loading message
        linksContainer.innerHTML = '';
        
        // Create and append links
        if (data.links && data.links.length > 0) {
            data.links.forEach(link => {
                const linkElement = document.createElement('a');
                linkElement.href = link.url;
                linkElement.className = 'link';
                linkElement.target = '_blank';
                linkElement.rel = 'noopener noreferrer';
                
                if (link.icon) {
                    const iconElement = document.createElement('i');
                    iconElement.className = link.icon;
                    linkElement.appendChild(iconElement);
                    linkElement.appendChild(document.createTextNode(' ')); // Space after icon
                }
                
                linkElement.appendChild(document.createTextNode(link.title));
                linksContainer.appendChild(linkElement);
                console.log('Added link:', link.title);
            });
        } else {
            linksContainer.innerHTML = '<p style="text-align:center">No links found in profile data</p>';
            console.warn('No links found in the loaded data');
        }
        
        // Set current year in footer
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
    } catch (error) {
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
}