import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../components/ui/input';
import { describe, it, expect } from 'vitest';

describe('Input', () => {
    it('renders correctly', () => {
        render(<Input placeholder="Enter text" />);
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('updates value on change', () => {
        render(<Input placeholder="Enter text" />);
        const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Hello' } });
        expect(input.value).toBe('Hello');
    });
});
