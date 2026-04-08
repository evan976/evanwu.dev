import { buildRobotsRules } from '@/lib/schema'
import { baseUrl } from '@/lib/site'

export default function robots() {
  return {
    rules: buildRobotsRules(),
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
