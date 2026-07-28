import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { MapPin, Globe, Sparkles, Navigation, Layers, ChevronRight, TrendingUp, Users } from 'lucide-react';

export interface TechHub {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  jobCount: number;
  avgSalary: string;
  growthRate: string;
  topTech: string[];
  densityIndex: number; // 1-100
}

const TECH_HUBS_DATA: TechHub[] = [
  {
    id: 'sf',
    name: 'San Francisco Bay Area',
    country: 'United States',
    coordinates: [-122.4194, 37.7749],
    jobCount: 14250,
    avgSalary: '$185,000',
    growthRate: '+18%',
    topTech: ['AI/LLMs', 'React', 'TypeScript', 'PyTorch'],
    densityIndex: 98,
  },
  {
    id: 'nyc',
    name: 'New York City',
    country: 'United States',
    coordinates: [-74.006, 40.7128],
    jobCount: 9820,
    avgSalary: '$170,000',
    growthRate: '+14%',
    topTech: ['FinTech', 'Node.js', 'Python', 'Kubernetes'],
    densityIndex: 88,
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    coordinates: [-0.1276, 51.5074],
    jobCount: 7410,
    avgSalary: '£110,000',
    growthRate: '+12%',
    topTech: ['Web3', 'React', 'Go', 'Rust'],
    densityIndex: 80,
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    coordinates: [139.6917, 35.6895],
    jobCount: 5200,
    avgSalary: '¥14.5M',
    growthRate: '+22%',
    topTech: ['Robotics', 'C++', 'Python', 'Computer Vision'],
    densityIndex: 72,
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    coordinates: [13.405, 52.52],
    jobCount: 4890,
    avgSalary: '€95,000',
    growthRate: '+15%',
    topTech: ['CleanTech', 'Vue.js', 'Elixir', 'Docker'],
    densityIndex: 68,
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    coordinates: [103.8198, 1.3521],
    jobCount: 6100,
    avgSalary: 'SGD 140k',
    growthRate: '+25%',
    topTech: ['Crypto', 'Java', 'Golang', 'AWS'],
    densityIndex: 78,
  },
  {
    id: 'austin',
    name: 'Austin',
    country: 'United States',
    coordinates: [-97.7431, 30.2672],
    jobCount: 5400,
    avgSalary: '$155,000',
    growthRate: '+19%',
    topTech: ['Hardware', 'System C', 'React Native'],
    densityIndex: 70,
  },
  {
    id: 'bangalore',
    name: 'Bengaluru',
    country: 'India',
    coordinates: [77.5946, 12.9716],
    jobCount: 12400,
    avgSalary: '₹3.2M',
    growthRate: '+31%',
    topTech: ['Full Stack', 'Java', 'Microservices', 'Spring'],
    densityIndex: 92,
  },
  {
    id: 'zurich',
    name: 'Zurich',
    country: 'Switzerland',
    coordinates: [8.5417, 47.3769],
    jobCount: 3100,
    avgSalary: 'CHF 165k',
    growthRate: '+9%',
    topTech: ['Security', 'Distributed Systems', 'C++'],
    densityIndex: 60,
  },
  {
    id: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    coordinates: [-79.3832, 43.6532],
    jobCount: 4600,
    avgSalary: 'CAD 135k',
    growthRate: '+16%',
    topTech: ['AI Research', 'Python', 'TensorFlow', 'PostgreSQL'],
    densityIndex: 65,
  }
];

interface JobDensityMapProps {
  onSelectRegion?: (locationName: string) => void;
}

export const JobDensityMap: React.FC<JobDensityMapProps> = ({ onSelectRegion }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedHub, setSelectedHub] = useState<TechHub>(TECH_HUBS_DATA[0]);
  const [hoveredHub, setHoveredHub] = useState<TechHub | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'radar'>('map');

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 800;
    const height = 400;

    // Clear previous elements
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', height);

    // Create a geo projection (Equirectangular)
    const projection = d3
      .geoEquirectangular()
      .scale((width / 620) * 100)
      .translate([width / 2, height / 1.8]);

    // Background grid & map decorative lines
    const gGrid = svg.append('g').attr('class', 'grid-lines').style('opacity', 0.2);

    // Latitude / Longitude grid lines
    const step = 30;
    for (let x = 0; x < width; x += step) {
      gGrid
        .append('line')
        .attr('x1', x)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', height)
        .attr('stroke', '#E7E5E4')
        .attr('stroke-width', 0.5)
        .attr('stroke-dasharray', '2,4');
    }
    for (let y = 0; y < height; y += step) {
      gGrid
        .append('line')
        .attr('x1', 0)
        .attr('y1', y)
        .attr('x2', width)
        .attr('y2', y)
        .attr('stroke', '#E7E5E4')
        .attr('stroke-width', 0.5)
        .attr('stroke-dasharray', '2,4');
    }

    // World Land outline decorative shapes (Abstract aesthetic continent nodes)
    const gNodes = svg.append('g').attr('class', 'hub-nodes');

    // Radius scale based on job density index
    const radiusScale = d3.scaleSqrt().domain([50, 100]).range([6, 18]);

    // Draw connection arcs between top hubs (SF - NYC, SF - Tokyo, NYC - London, London - Bangalore)
    const connections = [
      ['sf', 'nyc'],
      ['sf', 'tokyo'],
      ['nyc', 'london'],
      ['london', 'berlin'],
      ['london', 'singapore'],
      ['singapore', 'tokyo'],
      ['london', 'bangalore'],
    ];

    const gArcs = svg.append('g').attr('class', 'connection-arcs');

    connections.forEach(([srcId, targetId]) => {
      const src = TECH_HUBS_DATA.find((h) => h.id === srcId);
      const tgt = TECH_HUBS_DATA.find((h) => h.id === targetId);
      if (src && tgt) {
        const p1 = projection(src.coordinates);
        const p2 = projection(tgt.coordinates);
        if (p1 && p2) {
          const dx = p2[0] - p1[0];
          const dy = p2[1] - p1[1];
          const dr = Math.sqrt(dx * dx + dy * dy) * 1.2;

          gArcs
            .append('path')
            .attr('d', `M${p1[0]},${p1[1]}A${dr},${dr} 0 0,1 ${p2[0]},${p2[1]}`)
            .attr('fill', 'none')
            .attr('stroke', '#D4F268')
            .attr('stroke-width', 1)
            .attr('stroke-opacity', 0.25)
            .attr('stroke-dasharray', '4,4');
        }
      }
    });

    // Draw tech hub points
    TECH_HUBS_DATA.forEach((hub) => {
      const coords = projection(hub.coordinates);
      if (!coords) return;

      const [x, y] = coords;
      const r = radiusScale(hub.densityIndex);
      const isSelected = selectedHub.id === hub.id;

      const hubGroup = gNodes
        .append('g')
        .attr('transform', `translate(${x},${y})`)
        .style('cursor', 'pointer')
        .on('click', () => {
          setSelectedHub(hub);
          if (onSelectRegion) onSelectRegion(hub.name);
        })
        .on('mouseenter', () => setHoveredHub(hub))
        .on('mouseleave', () => setHoveredHub(null));

      // Outer animated pulsing circle for density
      hubGroup
        .append('circle')
        .attr('r', r * 1.8)
        .attr('fill', '#D4F268')
        .attr('fill-opacity', 0.1)
        .attr('stroke', '#D4F268')
        .attr('stroke-width', 0.5)
        .attr('class', 'animate-pulse');

      // Core density heat circle
      hubGroup
        .append('circle')
        .attr('r', r)
        .attr('fill', isSelected ? '#D4F268' : '#292524')
        .attr('stroke', isSelected ? '#FFFFFF' : '#D4F268')
        .attr('stroke-width', isSelected ? 2 : 1.5)
        .attr('filter', isSelected ? 'drop-shadow(0px 0px 8px rgba(212,242,104,0.8))' : 'none')
        .transition()
        .duration(500);

      // Center dot
      hubGroup
        .append('circle')
        .attr('r', 3)
        .attr('fill', isSelected ? '#0C0A09' : '#D4F268');

      // Hub Label text
      hubGroup
        .append('text')
        .text(hub.name.split(' ')[0].toUpperCase())
        .attr('x', r + 6)
        .attr('y', 4)
        .attr('fill', isSelected ? '#D4F268' : '#A8A29E')
        .attr('font-size', '10px')
        .attr('font-family', 'monospace')
        .attr('font-weight', isSelected ? 'bold' : 'normal');
    });
  }, [selectedHub, onSelectRegion, viewMode]);

  return (
    <div className="rounded-xl bg-[#1C1917] border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#D4F268]/30 transition-all duration-300">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D4F268]">
            <Globe className="w-4 h-4" />
            <span>[GEOGRAPHIC_VECTOR_DENSITY]</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif italic text-white mt-1">
            Global Technical Talent & Job Density Matrix
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('map')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-[#D4F268] text-[#0C0A09]'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-white/10'
            }`}
          >
            Vector Map
          </button>
          <button
            onClick={() => setViewMode('radar')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              viewMode === 'radar'
                ? 'bg-[#D4F268] text-[#0C0A09]'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-white/10'
            }`}
          >
            Density Rank
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 items-center">
        
        {/* D3 Geographic Visualizer / Density List */}
        <div className="lg:col-span-2 relative min-h-[360px] bg-[#0C0A09] rounded-lg border border-white/10 p-4 flex flex-col justify-center overflow-hidden">
          {viewMode === 'map' ? (
            <div ref={containerRef} className="w-full relative">
              <svg ref={svgRef} className="w-full h-auto" />
              
              {/* Dynamic Legend Overlay */}
              <div className="absolute bottom-3 left-3 bg-[#1C1917]/90 border border-white/10 px-3 py-2 rounded-lg text-[10px] font-mono text-stone-400 flex items-center gap-4 backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4F268] animate-pulse" />
                  <span>High Concentration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-stone-600" />
                  <span>Emerging Hub</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-2">
              {TECH_HUBS_DATA.slice()
                .sort((a, b) => b.jobCount - a.jobCount)
                .map((hub, i) => (
                  <div
                    key={hub.id}
                    onClick={() => {
                      setSelectedHub(hub);
                      if (onSelectRegion) onSelectRegion(hub.name);
                    }}
                    className={`p-3 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                      selectedHub.id === hub.id
                        ? 'bg-[#D4F268]/10 border-[#D4F268] text-[#D4F268]'
                        : 'bg-stone-900/60 border-white/10 text-stone-300 hover:border-stone-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold w-5 text-stone-500">#{i + 1}</span>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          {hub.name}
                          <span className="text-[10px] font-mono text-stone-400">({hub.country})</span>
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          {hub.topTech.map((t) => (
                            <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-sm font-bold text-[#D4F268]">{hub.jobCount.toLocaleString()} roles</span>
                      <span className="block text-[10px] text-emerald-400">{hub.growthRate} YoY</span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Selected Hub Specification Panel */}
        <div className="bg-[#0C0A09] rounded-lg border border-white/10 p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">[SELECTED_VECTOR]</span>
                <h3 className="text-xl font-serif italic text-white">{selectedHub.name}</h3>
                <p className="text-xs font-mono text-[#D4F268]">{selectedHub.country}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-stone-900 border border-white/10 flex items-center justify-center text-[#D4F268] shrink-0 font-mono text-xs font-bold">
                {selectedHub.densityIndex}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-[#1C1917] border border-white/10">
                <span className="text-[10px] font-mono uppercase text-stone-500 block">Active Openings</span>
                <span className="text-lg font-mono font-bold text-white">{selectedHub.jobCount.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#1C1917] border border-white/10">
                <span className="text-[10px] font-mono uppercase text-stone-500 block">Avg Compensation</span>
                <span className="text-lg font-mono font-bold text-[#D4F268]">{selectedHub.avgSalary}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#1C1917] border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">Demand Acceleration</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {selectedHub.growthRate}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-stone-900 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-lime-500 to-[#D4F268]"
                  style={{ width: `${selectedHub.densityIndex}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-2">Dominant Technical Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedHub.topTech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-stone-900 border border-white/10 text-stone-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (onSelectRegion) onSelectRegion(selectedHub.name);
            }}
            className="w-full py-3 rounded-lg bg-[#D4F268] hover:bg-lime-300 text-[#0C0A09] font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span>Filter Positions by {selectedHub.name}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
