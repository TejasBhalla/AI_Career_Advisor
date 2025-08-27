import puppeteer from "puppeteer";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getInternships = async (req, res) => {
    const { skill } = req.query; // get skill from query param
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        let url = "https://internshala.com/internships/";
        if (skill) {
            url = `https://internshala.com/internships/keywords-${encodeURIComponent(skill)}/`;
        }

        await page.goto(url, { waitUntil: "networkidle2" });

        await page.waitForSelector(".individual_internship");

        // Scroll to load more internships
        for (let i = 0; i < 5; i++) {
            await page.evaluate(() => window.scrollBy(0, window.innerHeight));
            await sleep(1000);
        }

        const internships = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll(".individual_internship"));
            return cards
                .map((card) => {
                    const titleEl = card.querySelector(".job-internship-name a");
                    const companyEl = card.querySelector(".company-name");
                    const locationEl = card.querySelector(".locations a");
                    const stipendEl = card.querySelector(".stipend");
                    const durationEl = card.querySelector(".row-1-item:nth-child(3) span");
                    const postedEl = card.querySelector(".status-success span");

                    return {
                        title: titleEl ? titleEl.innerText.trim() : "",
                        company: companyEl ? companyEl.innerText.trim() : "",
                        location: locationEl ? locationEl.innerText.trim() : "",
                        stipend: stipendEl ? stipendEl.innerText.trim() : "",
                        duration: durationEl ? durationEl.innerText.trim() : "",
                        posted: postedEl ? postedEl.innerText.trim() : "",
                        link: titleEl ? "https://internshala.com" + titleEl.getAttribute("href") : "",
                    };
                })
                .filter(
                    (i) =>
                        i.title || i.company || i.location || i.stipend || i.duration || i.posted || i.link
                ); 
        });

        await browser.close();
        res.json({ internships });
    } catch (error) {
        console.error("Internship scraping error:", error);
        res.status(500).json({ internships: [], error: error.message });
    }
};
