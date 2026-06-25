export type ImageSlotId =
  | "logo"
  | "home-hero"
  | "home-mission"
  | "home-gallery-featured"
  | "home-gallery-2"
  | "home-gallery-3"
  | "home-gallery-4"
  | "home-gallery-5"
  | "home-gallery-6"
  | "home-gallery-7"
  | "home-gallery-8"
  | "home-gallery-9"
  | "home-gallery-10"
  | "home-gallery-11"
  | "home-gallery-12"
  | "about-hero"
  | "about-community";

export type ImageSlot = {
  id: ImageSlotId;
  label: string;
  description: string;
  /** Set to a path in /images/library/ when assigned */
  src: string | null;
};

/**
 * All website image slots — src is null until you assign a library image.
 * Pick from files in public/images/library/
 */
export const LOGO_PATH = "/mtc-logo.png";

export const imageSlots: Record<ImageSlotId, ImageSlot> = {
  logo: {
    id: "logo",
    label: "Site Logo",
    description: "Navigation, footer, Luma about section",
    src: LOGO_PATH,
  },
  "home-hero": {
    id: "home-hero",
    label: "Home — Hero",
    description: "Full-width background behind welcome text",
    src: null,
  },
  "home-mission": {
    id: "home-mission",
    label: "Home — Mission",
    description: "Large photo next to mission copy (4:5)",
    src: "/images/library/p1020026.jpg",
  },
  "home-gallery-featured": {
    id: "home-gallery-featured",
    label: "Home — Gallery (large)",
    description: "Featured large tile in community gallery",
    src: "/images/library/img_7328.jpg",
  },
  "home-gallery-2": {
    id: "home-gallery-2",
    label: "Home — Gallery 2",
    description: "Community gallery grid",
    src: "/images/library/img_4021.jpg",
  },
  "home-gallery-3": {
    id: "home-gallery-3",
    label: "Home — Gallery 3",
    description: "Community gallery grid",
    src: "/images/library/img_6948.jpg",
  },
  "home-gallery-4": {
    id: "home-gallery-4",
    label: "Home — Gallery 4",
    description: "Community gallery grid",
    src: "/images/library/p1020119.jpg",
  },
  "home-gallery-5": {
    id: "home-gallery-5",
    label: "Home — Gallery 5",
    description: "Community gallery grid",
    src: "/images/library/img_2646.jpg",
  },
  "home-gallery-6": {
    id: "home-gallery-6",
    label: "Home — Gallery 6",
    description: "Community gallery grid",
    src: "/images/library/img_2647.jpg",
  },
  "home-gallery-7": {
    id: "home-gallery-7",
    label: "Home — Gallery 7",
    description: "Community gallery mosaic row",
    src: "/images/library/img_2649.jpeg",
  },
  "home-gallery-8": {
    id: "home-gallery-8",
    label: "Home — Gallery 8",
    description: "Community gallery mosaic row",
    src: "/images/library/p1020086.jpg",
  },
  "home-gallery-9": {
    id: "home-gallery-9",
    label: "Home — Gallery 9",
    description: "Community gallery mosaic row",
    src: "/images/library/p1020033.jpg",
  },
  "home-gallery-10": {
    id: "home-gallery-10",
    label: "Home — Gallery 10",
    description: "Community gallery mosaic row",
    src: "/images/library/p1020083.jpg",
  },
  "home-gallery-11": {
    id: "home-gallery-11",
    label: "Home — Gallery 11",
    description: "Community gallery mosaic row",
    src: "/images/library/img_4821.jpg",
  },
  "home-gallery-12": {
    id: "home-gallery-12",
    label: "Home — Gallery 12",
    description: "Community gallery mosaic row",
    src: "/images/library/p1020127.jpg",
  },
  "about-hero": {
    id: "about-hero",
    label: "About — Hero",
    description: "Right side of about page hero split",
    src: "/images/library/p1020080.jpg",
  },
  "about-community": {
    id: "about-community",
    label: "About — Who We Are",
    description: "Photo in who we are section",
    src: "/images/library/p1020009.jpg",
  },
};

export const gallerySlotIds: ImageSlotId[] = [
  "home-gallery-featured",
  "home-gallery-2",
  "home-gallery-3",
  "home-gallery-4",
  "home-gallery-5",
  "home-gallery-6",
  "home-gallery-7",
  "home-gallery-8",
  "home-gallery-9",
  "home-gallery-10",
  "home-gallery-11",
  "home-gallery-12",
];

export function getSlotSrc(id: ImageSlotId): string | null {
  return imageSlots[id].src;
}

/** Available photos in public/images/library/ — assign paths to slots above */
export const imageLibrary = [
  "/images/library/img_2646.jpg",
  "/images/library/img_2647.jpg",
  "/images/library/img_2649.jpeg",
  "/images/library/img_4021.jpg",
  "/images/library/img_4821.jpg",
  "/images/library/img_4825.jpg",
  "/images/library/img_6948.jpg",
  "/images/library/img_7328.jpg",
  "/images/library/p1020009.jpg",
  "/images/library/p1020026.jpg",
  "/images/library/p1020033.jpg",
  "/images/library/p1020080.jpg",
  "/images/library/p1020083.jpg",
  "/images/library/p1020086.jpg",
  "/images/library/p1020119.jpg",
  "/images/library/p1020121.jpg",
  "/images/library/p1020123.jpg",
  "/images/library/p1020127.jpg",
] as const;
