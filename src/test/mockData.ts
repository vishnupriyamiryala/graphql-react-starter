import type { User, Album } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '1-770-736-8031',
    website: 'johndoe.com',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    phone: '1-463-123-4447',
    website: 'janesmith.com',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618',
      },
    },
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  },
];

export const mockPosts = [
  {
    id: '1',
    title: 'First Post',
    body: 'This is the first post body',
  },
  {
    id: '2',
    title: 'Second Post',
    body: 'This is the second post body',
  },
  {
    id: '3',
    title: 'Third Post',
    body: 'This is the third post body',
  },
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'My First Album',
  },
  {
    id: '2',
    title: 'Vacation Photos',
  },
  {
    id: '3',
    title: 'Work Projects',
  },
];

export const mockUser = mockUsers[0];
