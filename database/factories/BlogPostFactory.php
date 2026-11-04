<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BlogPostFactory extends Factory
{
    public function definition(): array
    {
        static $index = 0;
        $blogs = [
            [
                'title' => '5 Ways to Stay Productive in a Coworking Space',
                'content' => "<h2>1. Choose the Right Spot</h2><p>Not all desks are created equal. Some thrive near natural light, others need quiet corners. Pay attention to your energy levels throughout the day and pick a spot that matches your workflow.</p><h2>2. Use Noise to Your Advantage</h2><p>The gentle hum of a coworking space can be surprisingly conducive to focus. If you need deeper silence, noise-canceling headphones or a Focus Cabin are excellent options.</p><h2>3. Set Boundaries</h2><p>It is easy to get pulled into conversations or impromptu meetings. Set clear signals — wear headphones, use a 'do not disturb' sign, or book a private room for deep work sessions.</p><h2>4. Leverage the Community</h2><p>One of the biggest perks of coworking is the people. Exchange skills, ask for feedback, or simply share a coffee break. These interactions often spark new ideas.</p><h2>5. Stick to a Routine</h2><p>Treat your coworking day like an office day. Arrive at the same time, plan your tasks, and log off with intention. Consistency breeds momentum.</p>",
                'excerpt' => 'The gentle hum of a coworking space can be surprisingly conducive to focus if you use it right. Here are five proven strategies to get more done.',
            ],
            [
                'title' => 'The Rise of Remote Work: Why Coworking Is the Future',
                'content' => "<p>The pandemic permanently shifted how we think about work. Millions discovered that the daily commute was optional, and the office as we knew it was ripe for reinvention.</p><h2>Flexibility Without Isolation</h2><p>Remote work solved the commute problem but introduced a new one: loneliness. Coworking spaces bridge the gap by offering professional infrastructure with human connection.</p><h2>Cost Efficiency for Businesses</h2><p>Leasing traditional office space requires multi-year commitments and hefty deposits. Coworking memberships scale up and down with your team size, making them ideal for startups and growing companies.</p><h2>The Data Speaks</h2><p>According to recent studies, 74% of coworking members report increased productivity, and 68% say they feel healthier than when working from home. The hybrid model is here to stay, and flexible workspaces are its backbone.</p>",
                'excerpt' => 'The pandemic permanently shifted how we think about work. Coworking spaces bridge the gap between remote isolation and traditional offices.',
            ],
            [
                'title' => 'How to Choose the Right Workspace for Your Team',
                'content' => "<p>Choosing a workspace is one of the most impactful decisions you will make for your team's culture and productivity. Here is a framework to guide the decision.</p><h2>Assess Your Team's Work Style</h2><p>Do they collaborate all day or need heads-down focus? A creative agency might thrive in an open loft, while a development team may prefer quiet private offices.</p><h2>Location Matters</h2><p>Proximity to public transit, parking, and lunch spots affects daily happiness. Visit potential spaces during rush hour to gauge the real commute experience.</p><h2>Check the Amenities</h2><p>Beyond WiFi and coffee, look for phone booths, reliable printing, secure bike storage, and after-hours access. These details make the difference between a space you use and a space you love.</p>",
                'excerpt' => 'Choosing a workspace is one of the most impactful decisions for your team culture. Here is a practical framework to find the perfect fit.',
            ],
            [
                'title' => 'Designing Workspaces for Creativity and Focus',
                'content' => "<p>The design of your workspace directly affects how you think, feel, and perform. Neuroscience shows that environment shapes cognition more than we realize.</p><h2>Lighting Sets the Tone</h2><p>Natural light is the single most desired feature in a workspace. It regulates circadian rhythms, boosts mood, and reduces eye strain. Our spaces prioritize floor-to-ceiling windows and full-spectrum LED lighting.</p><h2>Acoustic Zoning</h2><p>Different tasks require different sound environments. We design zones that range from silent study areas to buzzing collaboration hubs, each treated with acoustic panels and thoughtful layout.</p><h2>Biophilic Elements</h2><p>Plants, natural materials, and views of greenery reduce stress and improve cognitive function. Every Aurelia location integrates living walls, indoor trees, and natural textures.</p>",
                'excerpt' => 'Neuroscience shows that your physical environment shapes how you think. Discover the science behind workspace design that boosts both creativity and focus.',
            ],
            [
                'title' => 'Networking in Coworking Spaces: A Beginner\'s Guide',
                'content' => "<p>Walking into a room full of strangers can be intimidating. But coworking spaces are designed to make networking natural and effortless.</p><h2>Start with the Kitchen</h2><p>The coffee machine is the unofficial networking hub of any coworking space. A simple 'what do you work on?' can lead to a conversation that changes your month.</p><h2>Attend Community Events</h2><p>Most spaces host weekly lunches, happy hours, or skill-share sessions. These are low-pressure opportunities to meet people outside your immediate field.</p><h2>Give Before You Ask</h2><p>The best networkers are generous. Share a resource, make an introduction, or offer feedback before asking for anything in return. Relationships built on genuine help last the longest.</p>",
                'excerpt' => 'Walking into a room full of strangers can be intimidating. Learn how to turn casual coworking encounters into meaningful professional relationships.',
            ],
            [
                'title' => 'The Hidden Costs of Working From Home (And How Coworking Helps)',
                'content' => "<p>Working from home seems free — until you add it all up. Between heating, electricity, internet upgrades, and the productivity tax of household distractions, the true cost is higher than most realize.</p><h2>The Utility Bill Creep</h2><p>Running a home office year-round adds noticeable strain on your energy bills. Coworking memberships bundle climate control, high-speed internet, and cleaning into one predictable monthly fee.</p><h2>The Isolation Tax</h2><p>Isolation is not just unpleasant — it is expensive. Lonely workers report lower performance and higher turnover. The social infrastructure of a coworking space is an investment in retention.</p><h2>Work-Life Boundaries</h2><p>When your bedroom is your office, it is hard to log off. Coworking creates a physical commute — even if it is ten minutes — that helps separate professional and personal life.</p>",
                'excerpt' => 'Working from home seems free — until you add up heating, internet upgrades, and the productivity tax of household distractions.',
            ],
        ];

        $i = $index % count($blogs);
        $index++;
        $blog = $blogs[$i];

        return [
            'title' => $blog['title'],
            'content' => $blog['content'],
            'excerpt' => $blog['excerpt'],
            'featured_image' => '/images/blog-' . fake()->numberBetween(1, 6) . '.jpg',
            'is_published' => true,
            'published_at' => fake()->dateTimeBetween('-3 months', 'now'),
        ];
    }
}
