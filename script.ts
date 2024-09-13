document.getElementById('resumeForm')?.addEventListener('submit', function (e: Event): void {
    e.preventDefault();

    // Get the input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Handle image upload
    const profilePicInput = (document.getElementById('profilePic') as HTMLInputElement);
    let profilePicURL = '';
    if (profilePicInput.files && profilePicInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePicURL = e.target?.result as string;
            generateEditableResume(name, email, education, experience, skills, profilePicURL);
        };
        reader.readAsDataURL(profilePicInput.files[0]);
    } else {
        generateEditableResume(name, email, education, experience, skills, '');
    }
});

function generateEditableResume(name: string, email: string, education: string, experience: string, skills: string, profilePicURL: string): void {
    const skillsList = skills.split(',').map(skill => `<li contenteditable="true">${skill.trim()}</li>`).join('');
    const profilePicHTML = profilePicURL ? `<img src="${profilePicURL}" alt="Profile Picture">` : '';

    const resume = `
        ${profilePicHTML}
        <h2 contenteditable="true">${name}</h2>
        <p contenteditable="true"><strong>Email:</strong> ${email}</p>
        <h3 contenteditable="true">Education</h3>
        <p contenteditable="true">${education}</p>
        <h3 contenteditable="true">Work Experience</h3>
        <p contenteditable="true">${experience}</p>
        <h3>Skills</h3>
        <ul>${skillsList}</ul>
    `;

    const resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
        resumeOutput.innerHTML = resume;
        resumeOutput.classList.add('active');  // Apply the fade-in animation
    }
}
