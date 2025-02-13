import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });

  it('renders header and navigation elements', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders all navigation text content', () => {
    const navContainer = screen.getByRole('navigation');
    expect(navContainer).toHaveTextContent(/home/i);
    expect(navContainer).toHaveTextContent(/add card/i);
    expect(navContainer).toHaveTextContent(/view cards/i);
    expect(navContainer).toHaveTextContent(/today's quiz/i);
  });

  it('applies correct CSS classes', () => {
    expect(screen.getByRole('banner')).toHaveClass('navbar-container');
    expect(screen.getByRole('navigation')).toHaveClass('navbar');
    expect(screen.getByRole('navigation').querySelector('.navbar-items')).toBeInTheDocument();
  });

  it('renders all links with correct "to" attributes', () => {
    const expectedLinks = [
      { text: 'Home', to: '/' },
      { text: 'Add Card', to: '/add-card' },
      { text: 'View Cards', to: '/view-cards' },
      { text: "Today's Quiz", to: '/quiz' }
    ];

    expectedLinks.forEach(({ text, to }) => {
      const link = screen.getByText(text);
      expect(link).toHaveAttribute('to', to);
    });
  });

  it('renders links in correct order', () => {
    const navItems = screen.getByRole('navigation').querySelector('.navbar-items');
    const links = navItems?.querySelectorAll('a');
    expect(links).toHaveLength(4);

    const expectedOrder = [
      'Home',
      'Add Card',
      'View Cards',
      "Today's Quiz"
    ];

    links?.forEach((link, index) => {
      expect(link).toHaveTextContent(expectedOrder[index]);
    });
  });

  it('has proper navigation container structure', () => {
    const header = screen.getByRole('banner');
    const nav = screen.getByRole('navigation');
    const navItems = nav.querySelector('.navbar-items');

    expect(header).toContainElement(nav);
    expect(nav).toContainElement(navItems as HTMLElement);
    expect(navItems?.children.length).toBe(4);
  });

  it('contains all required navigation links', () => {
    const navItems = screen.getByRole('navigation').querySelector('.navbar-items');
    expect(navItems?.children).toHaveLength(4);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Add Card')).toBeInTheDocument();
    expect(screen.getByText('View Cards')).toBeInTheDocument();
    expect(screen.getByText("Today's Quiz")).toBeInTheDocument();
  });
});
