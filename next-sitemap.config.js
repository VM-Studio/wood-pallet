/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.madererajj.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/productos'),
    await config.transform(config, '/pallet-carton'),
    await config.transform(config, '/servicios'),
    await config.transform(config, '/contacto'),
  ],
}
