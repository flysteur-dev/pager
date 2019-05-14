import React from 'react';

// Close
// Source: https://material.io/tools/icons/?style=baseline
// Licensce: Apache 2.0
const CloseIcon = props => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
		<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</svg>
);

// OpenInNewIcon
// Source: https://material.io/tools/icons/?style=baseline
// Licensce: Apache 2.0
const OpenInNewIcon = props => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
		<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</svg>
)

// ShareIcon
// Source: https://material.io/tools/icons/?style=baseline
// Licensce: Apache 2.0
const ShareIcon = props => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
		<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</svg>
)

// StarFullIcon
// Source: https://material.io/tools/icons/?style=baseline
// Licensce: Apache 2.0
const StarFullIcon = props => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
		<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</svg>
)

// StarIcon
// Source: https://material.io/tools/icons/?style=baseline
// Licensce: Apache 2.0
const StarIcon = props => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
		<path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</svg>
)

// CompactIcon
// Source: https://material.io/tools/icons/?style=baseline
// Licensce: Apache 2.0
const CompactIcon = props => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
		<path d="M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z" />
		<path fill="none" d="M0 0h24v24H0z" />
	</svg>
)

export {
	CloseIcon,
	OpenInNewIcon,
	ShareIcon,
	StarFullIcon,
	StarIcon,
	CompactIcon,
};