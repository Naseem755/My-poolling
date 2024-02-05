// DOM elements
const memberInput = document.querySelector("#member");
const container = document.querySelector("#container");

// Array to store members' data
const membersData = JSON.parse(localStorage.getItem('members')) || [];

// Function to update the HTML based on the data
const loopHandler = () => {
    container.innerHTML = "";
    for (let i = 0; i < membersData.length; i++) {
        const item = membersData[i];

        // Create a new div for each member
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('flex', 'items-center', 'justify-between', 'border', 'p-2', 'rounded');

        // Display member name and vote count
        memberDiv.innerHTML = `
            <span>${item.name} (Votes: ${item.vote})</span>
            <button onclick="voteHandler(${i})" class="bg-blue-500 text-white px-4 py-2 ml-2">Vote</button>
            <button onclick="deleteHandler(${i})" class="bg-red-500 text-white px-4 py-2 ml-2">Delete</button>
        `;

        // Append the member div to the container
        container.appendChild(memberDiv);
    }
};

// Function to handle vote increase
const voteHandler = (index) => {
    membersData[index].vote += 1;
    loopHandler();
    updateLocalStorage();
};

// Function to handle member deletion
const deleteHandler = (index) => {
    membersData.splice(index, 1);
    loopHandler();
    updateLocalStorage();
};

// Function to handle member submission
const submitHandler = () => {
    const memberName = memberInput.value.trim();

    if (memberName === "") {
        alert("Please enter a valid member name.");
        return;
    }

    // Check if the member name already exists
    if (membersData.some(member => member.name.toLowerCase() === memberName.toLowerCase())) {
        alert("Member with the same name already exists.");
        return;
    }

    // Creating a new member object
    const member = {
        name: memberName,
        vote: 0
    };

    // Adding the member to the data array
    membersData.push(member);

    // Clearing the input field
    memberInput.value = "";

    // Updating the HTML
    loopHandler();

    // Update local storage
    updateLocalStorage();
};

// Function to update local storage
const updateLocalStorage = () => {
    localStorage.setItem('members', JSON.stringify(membersData));
};

// Function to show the winner
const showWinner = () => {
    if (membersData.length === 0) {
        alert("No members to determine a winner.");
        return;
    }

    // Find the member with the highest vote
    const winner = membersData.reduce((prev, current) => (prev.vote > current.vote) ? prev : current);

    alert(`Winner: ${winner.name} with ${winner.vote} votes.`);
};

// Initial update of HTML based on data
loopHandler();
// ... (Previous code)

// Function to show the results
const showResults = () => {
    if (membersData.length === 0) {
        alert("No members to determine a winner.");
        return;
    }

    // Sort members by vote count (descending order)
    const sortedMembers = membersData.slice().sort((a, b) => b.vote - a.vote);

    // Display results in the results section
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2 class="text-xl font-bold mb-4">Voting Results</h2>
        <ol class="list-decimal pl-8">
            ${sortedMembers.map((member, index) => `
                <li class="mb-2">
                    <span class="font-bold">${index + 1}. ${member.name}</span>
                    <span class="ml-2">(Votes: ${member.vote})</span>
                </li>
            `).join('')}
        </ol>
    `;
};
// Function to reset both members and results data
const resetData = () => {
    localStorage.removeItem('members');
    localStorage.removeItem('results');
    location.reload(); // Reload the page to clear the displayed data
};
// DOM elements


// ... (Remaining code)

// Listen for "Enter" key press in the member input
memberInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        submitHandler();
    }
});