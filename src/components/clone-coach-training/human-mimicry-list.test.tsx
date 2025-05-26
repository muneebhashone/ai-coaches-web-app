import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HumanMimicryList } from './human-mimicry-list';
import { useTranslations } from 'next-intl';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string, params: any) => {
    if (key === 'noMimicryStyles') return 'No human mimicry styles created yet.';
    if (key === 'addFirstStyleHint') return 'Add your first style to get started.';
    // Add other translations if needed by the component directly
    return key;
  }),
}));

const mockStyles = [
  {
    id: '1',
    name: 'Style 1',
    description: 'Description 1',
    toneExample: 'Tone 1',
    styleExample: 'Style 1 example',
    writingExample: 'Writing 1',
    personality: { tone: 'professional', style: 'structured', approach: 'consultative' },
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Style 2',
    description: 'Description 2',
    toneExample: 'Tone 2',
    styleExample: 'Style 2 example',
    writingExample: 'Writing 2',
    personality: { tone: 'empathetic', style: 'supportive', approach: 'person-centered' },
    createdAt: new Date().toISOString(),
  },
];

describe('HumanMimicryList', () => {
  const mockOnToggleSelection = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state when no styles are provided', () => {
    render(
      <HumanMimicryList
        styles={[]}
        selectedStyles={[]}
        onToggleSelection={mockOnToggleSelection}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText('No human mimicry styles created yet.')).toBeInTheDocument();
    expect(screen.getByText('Add your first style to get started.')).toBeInTheDocument();
  });

  it('renders a list of human mimicry styles', () => {
    render(
      <HumanMimicryList
        styles={mockStyles}
        selectedStyles={[]}
        onToggleSelection={mockOnToggleSelection}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText('Style 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Style 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('calls onToggleSelection when a style card is clicked', () => {
    render(
      <HumanMimicryList
        styles={mockStyles}
        selectedStyles={[]}
        onToggleSelection={mockOnToggleSelection}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    fireEvent.click(screen.getByText('Style 1').closest('div.cursor-pointer')!);
    expect(mockOnToggleSelection).toHaveBeenCalledWith('1');
  });

  it('calls onEdit when the edit button is clicked', () => {
    render(
      <HumanMimicryList
        styles={mockStyles}
        selectedStyles={[]}
        onToggleSelection={mockOnToggleSelection}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    // Find edit button within the first style's card
    const style1Card = screen.getByText('Style 1').closest('div.cursor-pointer');
    const editButton = style1Card?.querySelector('button[aria-label="Edit style"]'); // Assuming an aria-label for better selection
    if (editButton) {
      fireEvent.click(editButton);
    } else {
      // Fallback to less specific selector if no aria-label
      const buttons = style1Card?.querySelectorAll('button');
      fireEvent.click(buttons![0]); // Assuming edit is the first button
    }
    expect(mockOnEdit).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when the delete button is clicked', () => {
    render(
      <HumanMimicryList
        styles={mockStyles}
        selectedStyles={[]}
        onToggleSelection={mockOnToggleSelection}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    const style1Card = screen.getByText('Style 1').closest('div.cursor-pointer');
    const deleteButton = style1Card?.querySelector('button[aria-label="Delete style"]'); // Assuming an aria-label
     if (deleteButton) {
      fireEvent.click(deleteButton);
    } else {
      const buttons = style1Card?.querySelectorAll('button');
      fireEvent.click(buttons![1]); // Assuming delete is the second button
    }
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('highlights selected styles', () => {
    render(
      <HumanMimicryList
        styles={mockStyles}
        selectedStyles={['1']}
        onToggleSelection={mockOnToggleSelection}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    const style1Card = screen.getByText('Style 1').closest('div.cursor-pointer');
    expect(style1Card).toHaveClass('border-primary'); // From 'bg-primary/10 border-primary'
  });

  it('disables action buttons when isLoading is true', () => {
    render(
      <HumanMimicryList
        styles={mockStyles}
        selectedStyles={[]}
        onToggleSelection={mockOnToggleSelection}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isLoading={true}
      />
    );
    const style1Card = screen.getByText('Style 1').closest('div.cursor-pointer');
    const buttons = style1Card?.querySelectorAll('button');
    buttons?.forEach(button => expect(button).toBeDisabled());
  });
});

// Helper to add aria-labels to buttons in HumanMimicryList for easier testing
// This is a conceptual change. Ideally, the component itself would have these.
// For the test, we might need to rely on button order or more complex selectors if aria-labels are not present.
// For now, I've adapted the test to assume it might not have aria-labels.
// In a real scenario, I'd update the component to include them.
// Example:
// <Button variant="ghost" size="sm" aria-label="Edit style" ...> <Edit /> </Button>
// <Button variant="ghost" size="sm" aria-label="Delete style" ...> <Trash2 /> </Button>
// The test above tries to find by aria-label and falls back.
