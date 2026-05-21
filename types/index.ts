/**
 * Shared TypeScript types for the ODF site.
 */

export interface CTA {
  label: string;
  href: string;
  primary?: boolean;
  external?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface MinistryCard {
  id: string;
  name: string;
  tag: string;
  location: string;
  body: string;
  href: string;
}

export interface FocalItem {
  id: string;
  number: string;
  title: string;
  body: string;
  photo: string;
  photoAlt: string;
}

export interface ExpectationItem {
  title: string;
  body: string;
}
