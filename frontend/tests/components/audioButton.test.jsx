import { render, screen, fireEvent } from "@testing-library/react";
import AudioButton from "../../src/components/AudioButton/AudioButton";

describe("AudioButton", () => {
    test('AudioButton before clicked', () => {
        render(<AudioButton trackPreview="test-preview" />);
        const playButton = screen.getByRole('button');
        expect(playButton.textContent).toContain("▶");
    });

    test('AudioButton changes state to pause when clicked', () => {
        render(<AudioButton trackPreview="test-preview" />);
        const playButton = screen.getByRole('button');
        fireEvent.click(playButton); 
        expect(playButton.textContent).toContain("❚❚");
    });

    test('AudioButton changes state to play when clicked', () => {
        render(<AudioButton trackPreview="test-preview" />);
        const playButton = screen.getByRole('button');
        fireEvent.click(playButton);
        fireEvent.click(playButton);
        expect(playButton.textContent).toContain("▶");
    });
})