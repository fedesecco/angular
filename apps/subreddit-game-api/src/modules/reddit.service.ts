import { supabase } from '../lib/supabase';

export async function fetchAndCacheRedditTopPosts() {
    try {
        const res = await fetch('https://www.reddit.com/r/all/top.json?limit=500&t=day', {
            headers: { 'User-Agent': 'SubredditGameAPI/1.0' },
        });
        const json = await res.json();

        const posts = json.data.children.map((c: any) => ({
            reddit_id: c.data.id,
            title: c.data.title,
            author: c.data.author,
            subreddit: c.data.subreddit,
            score: c.data.score,
            url: c.data.url,
            permalink: `https://reddit.com${c.data.permalink}`,
            num_comments: c.data.num_comments,
            created_utc: new Date(c.data.created_utc * 1000).toISOString(),
        }));

        // Clear old posts
        await supabase.from('reddit_posts').delete().neq('id', 0);

        // Insert new posts
        const { error } = await supabase.from('reddit_posts').insert(posts);
        if (error) throw error;

        console.log('✅ Reddit posts cached successfully');
    } catch (err) {
        console.error('❌ Failed to fetch/cache Reddit posts:', err);
    }
}
