import { render, screen, fireEvent} from "@testing-library/react";

import NewPost from "../../src/components/Post/newPost";

describe("newPost", () => {
    
    test('types into the textbox', () => {
        render(<NewPost/>);
        const textbox = screen.getByRole('textbox');
        fireEvent.change(textbox, { target: { value: 'Hello, world!' } });
        expect(textbox.value).toBe('Hello, world!');
    });

// Assuming you have a function that makes the post request

describe('HTTP Post Request Test', () => {
  it('should receive a successful response (status code 200)', async () => {
    // Mock the global fetch function
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, // Mock a successful response
      json: async () => ({ success: true }), // Mock response data
    });

    // Call the function that makes the post request
    const result = await makePostRequest('/api/yourEndpoint', { /* your data */ });

    // Perform assertions
    expect(result).toEqual({ success: true });

    // Ensure that the post request was made
    expect(fetch).toHaveBeenCalledWith('/api/yourEndpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* your data */ }),
    });
  });

  it('should handle an error response (status code 500)', async () => {
    // Mock the global fetch function
    global.fetch = jest.fn().mockResolvedValue({
      status: 500, // Mock an error response
    });

    // Call the function that makes the post request
    try {
      await makePostRequest('/api/yourEndpoint', { /* your data */ });
    } catch (error) {
      // Perform assertions for error handling
      expect(error.message).toBe('Internal Server Error');
    }

    // Ensure that the post request was made
    expect(fetch).toHaveBeenCalledWith('/api/yourEndpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* your data */ }),
    });
  });
});

    // test("Creates a new post and displays it on the feed page", () => {
    //     const testMessage = "This is a test post."
    //     window.localStorage.setItem("token", "testToken");

    //     render(<newPost token={token}/>)
        
    // });
});
