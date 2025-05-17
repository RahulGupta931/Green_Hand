import React, { useState } from 'react';
import { Leaf, Info, Sun, Droplet, Wind, ArrowRight } from 'lucide-react';

const careGuides = [
  {
    id: 'beginners',
    title: 'For Beginners',
    icon: <Leaf className="h-6 w-6" />,
    description: 'Essential care tips for those just starting their plant journey',
    content: `
      <h3>Starting Your Plant Journey</h3>
      <p>When beginning your plant parent journey, it's best to start with hardy, forgiving plants that can withstand some neglect. Snake plants, pothos, and ZZ plants are excellent choices for beginners.</p>
      
      <h3>Basic Plant Care</h3>
      <ul>
        <li>Start with just a few plants and gradually expand your collection</li>
        <li>Place plants in appropriate light conditions (most houseplants prefer bright, indirect light)</li>
        <li>Water thoroughly but only when the top inch of soil is dry</li>
        <li>Use well-draining soil and pots with drainage holes</li>
        <li>Clean leaves occasionally to remove dust</li>
      </ul>
      
      <h3>Common Beginner Mistakes</h3>
      <ul>
        <li>Overwatering (the #1 cause of houseplant death)</li>
        <li>Insufficient light</li>
        <li>Using pots without drainage</li>
        <li>Ignoring pest problems until they're severe</li>
      </ul>
    `
  },
  {
    id: 'watering',
    title: 'Watering Guide',
    icon: <Droplet className="h-6 w-6" />,
    description: 'Learn how to water your plants properly for optimal growth',
    content: `
      <h3>Watering Fundamentals</h3>
      <p>Proper watering is crucial for plant health. Different plants have different water needs, but most houseplants prefer to dry out slightly between waterings.</p>
      
      <h3>How to Water Properly</h3>
      <ul>
        <li>Water thoroughly until water flows from drainage holes</li>
        <li>Allow excess water to drain completely</li>
        <li>Use room temperature water, not cold</li>
        <li>Water less frequently in winter when plant growth slows</li>
        <li>Consider using filtered water for sensitive plants</li>
      </ul>
      
      <h3>Signs of Improper Watering</h3>
      <p><strong>Overwatering:</strong> Yellowing leaves, soft or mushy stems, mold on soil, fungus gnats</p>
      <p><strong>Underwatering:</strong> Brown leaf tips/edges, crispy leaves, slow growth, soil pulling away from pot edges</p>
      
      <h3>Watering Schedule by Plant Type</h3>
      <p><strong>Succulents & cacti:</strong> Allow to dry completely between waterings (every 2-4 weeks)</p>
      <p><strong>Tropical plants:</strong> Allow top inch to dry out (usually every 7-10 days)</p>
      <p><strong>Ferns & calatheas:</strong> Keep consistently moist (check every few days)</p>
    `
  },
  {
    id: 'light',
    title: 'Light Requirements',
    icon: <Sun className="h-6 w-6" />,
    description: 'Understanding the light needs of different plant varieties',
    content: `
      <h3>Understanding Plant Light Needs</h3>
      <p>Light is plant food! Without adequate light, plants cannot photosynthesize properly. Understanding the different light levels in your home is essential for plant placement.</p>
      
      <h3>Types of Light Exposure</h3>
      <ul>
        <li><strong>Bright direct light:</strong> Unfiltered sunlight directly hitting the plant (south-facing windows)</li>
        <li><strong>Bright indirect light:</strong> Strong light that doesn't directly shine on plants (near east/west windows)</li>
        <li><strong>Medium light:</strong> Several feet away from windows or filtered through blinds</li>
        <li><strong>Low light:</strong> No direct sunlight, north-facing windows or interior spaces</li>
      </ul>
      
      <h3>Signs of Light Problems</h3>
      <p><strong>Too much light:</strong> Scorched/bleached leaves, dry soil, drooping</p>
      <p><strong>Too little light:</strong> Leggy growth, small leaves, reduced variegation, leaning toward light source</p>
      
      <h3>Seasonal Changes</h3>
      <p>Remember that light conditions change with seasons. Plants may need to be moved as the sun's angle changes throughout the year, especially in winter when light is less intense.</p>
    `
  },
  {
    id: 'pests',
    title: 'Pest Control',
    icon: <Info className="h-6 w-6" />,
    description: 'Identifying and treating common plant pests naturally',
    content: `
      <h3>Common Houseplant Pests</h3>
      <p>Even well-cared-for plants can encounter pests. Early detection is key to preventing infestations.</p>
      
      <h3>Pest Identification & Treatment</h3>
      <p><strong>Spider mites:</strong> Tiny specks with fine webbing. Treat with regular misting, neem oil, or insecticidal soap.</p>
      
      <p><strong>Mealybugs:</strong> White cottony masses in leaf joints. Remove with alcohol-dipped cotton swab and treat with neem oil.</p>
      
      <p><strong>Fungus gnats:</strong> Small flies hovering around soil. Let soil dry out between waterings, use sticky traps, and apply diatomaceous earth to soil surface.</p>
      
      <p><strong>Scale:</strong> Immobile brown or tan bumps on stems/leaves. Scrape off gently and treat with neem oil.</p>
      
      <h3>Prevention Tips</h3>
      <ul>
        <li>Inspect new plants thoroughly before bringing home</li>
        <li>Quarantine new plants for 1-2 weeks</li>
        <li>Regularly check plants for signs of pests</li>
        <li>Keep leaves clean by wiping with a damp cloth</li>
        <li>Maintain good air circulation around plants</li>
      </ul>
    `
  },
  {
    id: 'repotting',
    title: 'Repotting Guide',
    icon: <Wind className="h-6 w-6" />,
    description: 'When and how to repot your plants for continued growth',
    content: `
      <h3>When to Repot</h3>
      <p>Most houseplants benefit from repotting every 1-2 years, but look for these signs that it's time:</p>
      <ul>
        <li>Roots growing out of drainage holes</li>
        <li>Water runs straight through the pot without being absorbed</li>
        <li>Plant is top-heavy or root-bound (tightly packed roots)</li>
        <li>Growth has slowed despite good care</li>
      </ul>
      
      <h3>Repotting Process</h3>
      <ol>
        <li>Water plant 1-2 days before repotting to reduce stress</li>
        <li>Select a new pot 1-2" larger in diameter than the current one</li>
        <li>Ensure the new pot has drainage holes</li>
        <li>Add fresh potting mix to the bottom of the new pot</li>
        <li>Gently remove plant from old pot and loosen outer roots</li>
        <li>Place in new pot and fill sides with fresh potting mix</li>
        <li>Water thoroughly and place in indirect light for a few days</li>
      </ol>
      
      <h3>Best Time to Repot</h3>
      <p>Spring and early summer are ideal for repotting, as plants are entering their active growth phase. Avoid repotting when plants are dormant (usually winter).</p>
    `
  }
];

const CareGuide: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState(careGuides[0]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Plant Care Guide</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn how to keep your plants thriving with our comprehensive care guides.
            Whether you're a beginner or experienced plant parent, we've got tips for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          {/* Guide Navigation - Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Topics</h2>
              <nav className="space-y-2">
                {careGuides.map(guide => (
                  <button
                    key={guide.id}
                    onClick={() => setActiveGuide(guide)}
                    className={`flex items-center w-full text-left px-3 py-2.5 rounded-md transition-colors ${
                      activeGuide.id === guide.id 
                        ? 'bg-green-100 text-green-800' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`mr-3 ${activeGuide.id === guide.id ? 'text-green-600' : 'text-gray-500'}`}>
                      {guide.icon}
                    </span>
                    <span>{guide.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Guide Content */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <div className="flex items-center mb-6">
                <span className="text-green-600 mr-3">{activeGuide.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{activeGuide.title}</h2>
              </div>
              
              <div 
                className="prose prose-green max-w-none" 
                dangerouslySetInnerHTML={{ __html: activeGuide.content }}
              />
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Ready to apply what you've learned?</h3>
                <a 
                  href="/products" 
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium group"
                >
                  Shop plants that match your care style
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareGuide;