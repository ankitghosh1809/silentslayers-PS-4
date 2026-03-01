import { NextResponse } from "next/server";

// ─── Intent Detection ────────────────────────────────────────────────────────

function detectIntent(msg: string): string {
    const text = msg.toLowerCase();

    if (/\b(hello|hi|hey|greet|good morning|good evening|howdy)\b/.test(text)) return "greeting";
    if (/\b(rating|drop|declin|fall|low|down|decreas)\b/.test(text)) return "ratings";
    if (/\b(complaint|complain|issue|problem|negative|unhappy|angry)\b/.test(text)) return "complaints";
    if (/\b(sentiment|feeling|emotion|mood|tone)\b/.test(text)) return "sentiment";
    if (/\b(reply|response|respond|template|apolog|draft)\b/.test(text)) return "reply_template";
    if (/\b(branch|location|outlet|store|site)\b/.test(text)) return "branch";
    if (/\b(staff|employee|team|worker|agent|member)\b/.test(text)) return "staff";
    if (/\b(insight|trend|pattern|analyz|analytic|summar)\b/.test(text)) return "insights";
    if (/\b(urgent|escalat|critical|immediat|asap|priority)\b/.test(text)) return "urgent";
    if (/\b(satisf|happy|positive|good|excellent|great)\b/.test(text)) return "positive";
    if (/\b(improve|better|recommend|suggest|tip|advice|strategy)\b/.test(text)) return "improve";
    if (/\b(report|dashboard|metric|kpi|performance|score)\b/.test(text)) return "report";
    if (/\b(customer|client|user|buyer|guest)\b/.test(text)) return "customer";
    if (/\b(automat|workflow|pipeline|process|integrat|n8n)\b/.test(text)) return "automation";
    if (/\b(thank|thanks|great job|awesome|well done|perfect)\b/.test(text)) return "thanks";
    if (/\b(help|what can you|what do you|guide|how)\b/.test(text)) return "help";

    return "general";
}

// ─── Response Library ────────────────────────────────────────────────────────

const responses: Record<string, string[]> = {
    greeting: [
        "Hello! I'm your ReviewFlow AI Specialist. I can help you analyze reviews, understand sentiment patterns, draft responses, and track your reputation performance. What would you like to explore?",
        "Hey there! Ready to dive into your review intelligence? Ask me about ratings trends, complaint summaries, branch performance, or anything customer feedback related.",
        "Hi! Great to have you here. Whether it's spotting patterns in negative reviews or crafting the perfect reply — I'm on it. What do you need today?",
    ],
    ratings: [
        "Rating drops usually signal a recurring operational issue. The most common culprits are: **long wait times**, **staff inconsistency**, or a **specific branch underperforming**. I'd recommend filtering reviews from the last 30 days by 1-2 stars and looking for repeated keywords. Which branch would you like me to analyze?",
        "When ratings decline steadily, it often points to a systemic issue rather than isolated incidents. Check if the drop correlates with a specific time period, staff change, or new menu/service rollout. Would you like a breakdown by branch or by category?",
        "A rating drop is a signal, not a verdict. It often means customer expectations aren't being met in one key area. Based on recent data patterns, **service speed** and **staff responsiveness** are the most cited reasons. Want me to draft an action plan?",
    ],
    complaints: [
        "Based on patterns in your recent reviews, the top complaint themes are: **wait times**, **cold food**, and **staff attitude**. I'd suggest addressing these in your weekly team briefing. Would you like me to generate a complaint summary report for a specific branch?",
        "Negative reviews tend to cluster around predictable triggers — peak hour service failures, specific staff interactions, or product quality inconsistencies. I can help you group them by category and prioritize which ones need immediate escalation.",
        "To handle complaints effectively: acknowledge the issue within 2 hours, offer a genuine solution, and follow up within 24 hours. Would you like a professional complaint response template?",
    ],
    sentiment: [
        "Sentiment analysis breaks your reviews into **Positive**, **Neutral**, and **Negative** categories. Your current sentiment distribution shows elevated negative signals around service speed. Would you like a detailed sentiment breakdown by branch or time period?",
        "Sentiment across your reviews this week is trending **neutral-to-negative**, primarily driven by keywords like 'slow', 'wait', and 'unresponsive'. This suggests a staffing or process gap during peak hours.",
        "Sentiment scoring helps you spot emotional patterns before they become reputation crises. I can flag reviews with high urgency scores (7-10) that need immediate attention. Would you like to see the current urgency queue?",
    ],
    reply_template: [
        "Here's a professional apology template you can use:\n\n*\"Dear [Customer Name], thank you for taking the time to share your feedback. We sincerely apologize for the experience you had. This does not reflect our standards, and we are addressing this with our team immediately. We'd love the opportunity to make it right — please reach out to us at [contact]. — [Manager Name]\"*\n\nWould you like me to customize this for a specific review?",
        "A good response template has 4 parts: **Acknowledge** the issue, **Apologize** genuinely, **Act** (state what you're doing), and **Invite** them back. Want me to generate one tailored to a specific complaint type?",
        "For negative reviews, keep responses under 80 words, stay professional, and never argue. Here's a quick template:\n\n*\"Thank you for your honest feedback. We're sorry your experience fell short of expectations. We've flagged this with our management team and will work to improve. We hope to serve you better next time.\"*",
    ],
    branch: [
        "Each branch has its own unique review fingerprint. Your **Downtown branch** consistently scores highest for ambience, while **Midtown** has the most complaints about wait times. Would you like a full branch-by-branch comparison?",
        "Branch-level analytics reveal that location-specific issues often stem from local staffing or supply chain. Which branch are you concerned about? I can pull sentiment trends for that specific location.",
        "Looking at branch performance, the best way to improve scores is to identify the top 3 recurring complaints per branch and address them with targeted operational changes. Want me to generate that list?",
    ],
    staff: [
        "Staff-related mentions appear in about 35% of all reviews. Positive mentions usually call out specific names and behaviors — these are your brand ambassadors. Negative mentions tend to focus on 'rude' or 'unhelpful' interactions. Would you like a staff sentiment report?",
        "Your team is the frontline of your reputation. I can help you identify which staff members are mentioned positively most often, and which interactions are generating complaints. Want to run a staff performance sentiment scan?",
        "Staff training is the #1 lever for improving review scores. Reviews mentioning 'staff' as a positive factor correlate with 0.8+ star rating improvements. Would you like to see which behaviors customers appreciate most?",
    ],
    insights: [
        "Here are this week's top insights:\n\n📍 **Midtown branch** has the highest urgency score (8.2/10)\n📉 **Overall rating** dropped 0.3 stars vs last week\n🔥 **Top complaint keyword:** 'wait time'\n✅ **Best performer:** Downtown branch (4.6 stars avg)\n\nWould you like a deeper dive into any of these?",
        "Trend analysis shows that **Friday and Saturday evenings** generate 60% of your negative reviews — pointing to a peak-hour staffing gap. Consider surge staffing during these windows.",
        "Your review velocity (number of reviews per day) has increased by 22% this month — a good sign of increased customer engagement. However, the sentiment ratio has shifted slightly negative. Let me know if you'd like the full analysis.",
    ],
    urgent: [
        "There are currently **3 reviews** marked as high urgency (score 8+) that require immediate attention. These involve keywords like 'refund', 'manager', and 'never returning'. I recommend responding within the next 2 hours. Shall I draft responses for each?",
        "Urgent reviews are those with high escalation potential — often involving public platforms like Google or Swiggy. I prioritize these with an urgency score above 7. Want me to show you the current escalation queue?",
        "For critical reviews, speed of response is everything. Even a brief acknowledgment within 1 hour can prevent a 1-star review from escalating to a social media complaint. Would you like a rapid-response template?",
    ],
    positive: [
        "Great news — your positive review count is up 18% this month! The most praised aspects are **food quality**, **ambience**, and **staff friendliness** at your Downtown branch. Capitalize on this by sharing these reviews on social media.",
        "Positive reviews are your best marketing asset. I can help you identify recurring themes in your 5-star reviews and turn them into your brand's unique selling points. Want me to extract the top positive keywords?",
        "Customer satisfaction is trending upward! To sustain this momentum, consider implementing a post-visit feedback prompt to capture more positive reviews proactively. Would you like me to help set that up?",
    ],
    improve: [
        "Here are 3 immediate actions to improve your review scores:\n\n1. **Train staff** on peak-hour service protocols\n2. **Respond** to all negative reviews within 2 hours\n3. **Incentivize** satisfied customers to leave reviews\n\nWould you like a detailed action plan for any of these?",
        "The fastest way to improve scores: fix the top complaint theme. Right now that's **service speed**. A 15% reduction in wait time typically results in a 0.5-star improvement within 30 days.",
        "Improvement starts with measurement. I recommend setting a monthly target for your urgency score (below 5), sentiment ratio (70%+ positive), and response rate (100% within 24 hours). Want me to help you track these KPIs?",
    ],
    report: [
        "Your current dashboard metrics:\n\n📊 **Average Rating:** 3.9/5\n💬 **Total Reviews This Month:** 247\n🔴 **Negative Reviews:** 62 (25%)\n🟢 **Positive Reviews:** 148 (60%)\n⚠️ **High Urgency:** 8 reviews\n\nWould you like a full PDF report or a deeper breakdown?",
        "Performance metrics look solid overall, but the urgency queue needs attention. I'd recommend a weekly review of your KPIs — response rate, urgency score, sentiment ratio, and branch ranking. Want me to set that up as a recurring insight?",
        "Your customer satisfaction score (CSAT) this month is estimated at **71%** based on review sentiment. Industry benchmark for your category is 75%. Let me show you the specific gaps.",
    ],
    customer: [
        "Customer behavior patterns in your reviews show that **repeat customers** leave 40% more positive reviews, while **first-time visitors** are more likely to leave negative feedback if expectations aren't set correctly. Want strategies to improve first-visit experience?",
        "Understanding your customers starts with their own words. Your most cited positive experiences involve **consistency** and **personal attention**. Your most cited negatives involve **wait times** and **communication gaps**.",
        "Customer retention is 5x cheaper than acquisition. Every negative review that goes unanswered increases churn risk by ~15%. I can help you build a systematic response workflow. Want to start?",
    ],
    automation: [
        "Your automation pipeline is: **Review Received → Database → n8n Workflow → AI Analysis → Dashboard Alert**. This means every review is processed in under 2 seconds and flagged if it needs attention. Want to know how to optimize any step?",
        "The n8n automation engine handles your review enrichment pipeline — sentiment scoring, urgency detection, and routing critical reviews to your dashboard. It runs 24/7 without manual intervention.",
        "Automation is the backbone of your review intelligence system. If you want to add a new trigger (e.g., auto-email manager when urgency > 8), I can help you configure that in the pipeline.",
    ],
    thanks: [
        "You're welcome! I'm always here to help you stay on top of your review intelligence. Is there anything else you'd like to explore?",
        "Happy to help! Your reputation is in good hands. Let me know if there's anything else you need.",
        "Glad I could assist! Feel free to ask anything about your reviews, branches, or performance anytime.",
    ],
    help: [
        "I'm your ReviewFlow AI Specialist. Here's what I can help you with:\n\n• 📊 **Sentiment analysis** of your reviews\n• 📉 **Rating trend analysis** by branch or time\n• ✍️ **Draft professional responses** to negative reviews\n• ⚠️ **Identify urgent reviews** that need immediate action\n• 📍 **Branch performance comparison**\n• 💡 **Improvement recommendations**\n\nJust ask me anything!",
        "You can ask me things like:\n- *'Why are ratings dropping in Midtown?'*\n- *'Summarize this week's complaints'*\n- *'Generate an apology response template'*\n- *'Which branch is performing best?'*\n- *'What are customers saying about our staff?'*",
    ],
    general: [
        "That's a great question! Based on what I know about your review data and business context, I'd suggest looking at recent trends in your dashboard to get a clearer picture. Could you give me a bit more detail so I can provide a more specific answer?",
        "Interesting — let me think about that in the context of your review intelligence platform. The most relevant data points would be your recent sentiment trends and urgency scores. Would you like me to pull a summary?",
        "I want to make sure I give you the most useful answer possible. Could you clarify whether you're asking about a specific branch, time period, or type of review? That way I can give you a targeted insight.",
    ],
};

// ─── Response Generator ───────────────────────────────────────────────────────

function generateResponse(message: string): string {
    const intent = detectIntent(message);
    const pool = responses[intent] || responses.general;
    return pool[Math.floor(Math.random() * pool.length)];
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message || typeof message !== "string" || !message.trim()) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // Simulate slight processing delay for realism
        await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 600));

        const reply = generateResponse(message.trim());
        return NextResponse.json({ reply });

    } catch (error) {
        console.error("AI Route Error:", error);
        return NextResponse.json({
            reply: "I'm having trouble processing that right now. Could you rephrase your question?"
        });
    }
}
