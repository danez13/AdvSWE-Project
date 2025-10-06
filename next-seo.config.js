/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
	title: 'Clover Tech',
	titleTemplate: '%s | Clover Tech',
	defaultTitle: 'Clover Tech',
	description:
		'Clover Tech is a technology solutions company delivering innovative software, digital products, and IT consulting for modern businesses.',
	canonical: 'https://www.clovertech.com', // update with your real domain
	openGraph: {
		url: 'https://www.clovertech.com', // update with your real domain
		title: 'Clover Tech',
		description:
			'Clover Tech provides cutting-edge technology solutions and consulting services to help businesses grow and innovate.',
		type: 'website',
		images: [
			{
				url: 'https://www.clovertech.com/og-image.png', // replace with your OG image URL
				alt: 'Clover Tech Open Graph Image',
				width: 1200,
				height: 630,
			},
		],
		site_name: 'Clover Tech',
	},
	twitter: {
		handle: '@clovertech', // replace with your actual Twitter handle
		site: '@clovertech',
		cardType: 'summary_large_image',
	},
	additionalLinkTags: [
		{
			rel: 'icon',
			href: '/favicon.ico', // replace with your favicon path
		},
	],
};

export default defaultSEOConfig;
