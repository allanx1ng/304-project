"use client";

import { useState, useEffect } from "react";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const BACKEND_URL = "http://localhost:3000";
const POST_URL = `${BACKEND_URL}/post`;

const DeletePost = () => {
	const [targetId, setTargetId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const tryDelete = async () => {
		const POST_ID_URL = POST_URL + "/" + targetId
		console.log(POST_ID_URL)
        const response = await fetch(POST_ID_URL, {
            method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
        });

        return response;
    };

	const handleErrors = (errorText) => {
		if (errorText == "Forbidden") {
			setErrorMessage("Unauthorized: You must be the creator of the post to delete that post.");
		} else if (errorText == "Not Found") {
			setErrorMessage("Not found error: That post does not exist.");
		} else {
			setErrorMessage(errorText);
		}
	}

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        if (!targetId) {
            setErrorMessage("Please specify a post ID to delete.");
            setIsLoading(false);
            return;
        }
		
		const data = tryDelete();
		data.then((response) => {
			if (response.ok) {
				return response.json();
			}
			return Promise.reject(response);
		}).then((result) => {
			console.log(result);
			setErrorMessage("");
			setSuccessMessage("Successfully deleted the post.");
		})
		.catch((error) => {
			console.log(error);
			setSuccessMessage("");
			handleErrors(error.statusText);
		});
		setIsLoading(false);
    };

    return (
        <div className="mx-auto max-w-md p-6">
            <form className="flex flex-col space-y-4">
                <label htmlFor="postId">Enter the id of the post to delete:</label>
				<input
					id="postId"
                    type="number"
                    placeholder="E.g. 1"
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {isLoading ? "Loading..." : "Submit"}
                </button>
            </form>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
			{successMessage && <div className="text-blue-500">{successMessage}</div>}
        </div>
    );
};

export default DeletePost;
