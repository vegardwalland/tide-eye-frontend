import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HarborSelector from '../HarborSelector';

describe('HarborSelector', () => {
  test('renders dropdown with harbor options and handles selection', () => {
    const mockHarbors = ['Harbor 1', 'Harbor 2'];
    const mockOnSelect = jest.fn();

    render(<HarborSelector harbors={mockHarbors} onSelect={mockOnSelect} selectedHarbor='' />);

    // Check if the dropdown is rendered
    const selectElement = screen.getByLabelText(/Select Harbor:/);
    expect(selectElement).toBeInTheDocument();

    // Check if the options are rendered
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(3); // 2 harbors + 1 placeholder

    // Simulate selecting a harbor
    fireEvent.change(selectElement, { target: { value: 'Harbor 1' } });
    expect(mockOnSelect).toHaveBeenCalledWith('Harbor 1');
  });
});
