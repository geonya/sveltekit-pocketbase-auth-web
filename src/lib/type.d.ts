interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  emailVisibility: boolean
  verified: boolean;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

interface Project extends Object {
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  id: string;
  name: string;
  tagline: string;
  thumbnail: string;
  updated: string;
  url: string;
  user: string;
  expand: Object;
}
