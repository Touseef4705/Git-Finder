import React, { useState } from "react";

const GitHubProfileChecker = () => {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [status, setStatus] = useState(null);

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleCheckProfile = async () => {
        setStatus(null);
        setProfile(null);

        if (username.trim() === "") {
            setStatus("Please enter a valid GitHub username.");
            return;
        }

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.status === 404) {
                setStatus("Account not found.");
            } else if (response.ok) {
                const data = await response.json();
                setProfile({
                    name: data.name || "No name available",
                    avatar: data.avatar_url,
                    url: data.html_url,
                    followers: data.followers,
                    publicRepos: data.public_repos,
                });
                setStatus("Profile found!");
            } else {
                setStatus("An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            setStatus("Failed to fetch profile. Please check your connection.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-800 p-6">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 ">
                <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
                    GitHub Profile Checker
                </h1>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 mb-6"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={handleInputChange}
                />
                <button
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 focus:outline-none"
                    onClick={handleCheckProfile}
                >
                    Check Profile
                </button>

                {status && (
                    <div className={`mt-6 text-lg text-center ${status === "Profile found!" ? "text-green-600" : "text-red-500"}`}>
                        {status}
                    </div>
                )}

                {profile && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md text-white text-center transform transition duration-500 hover:scale-105">
                        <img
                            src={profile.avatar}
                            alt={`${profile.name}'s avatar`}
                            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
                        />
                        <h2 className="text-2xl font-semibold">{profile.name}</h2>
                        <a
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white underline text-lg hover:text-gray-300 mt-2 inline-block"
                        >
                            View GitHub Profile
                        </a>
                        <div className="mt-4 flex justify-around text-xl font-bold">
                            <div>
                                <h3>{profile.followers}</h3>
                                <span className="text-gray-300">Followers</span>
                            </div>
                            <div>
                                <h3>{profile.publicRepos}</h3>
                                <span className="text-gray-300">Repositories</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GitHubProfileChecker;
