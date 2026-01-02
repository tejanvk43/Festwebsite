import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { events } from "../data/events";

const TYPE_FILTERS = ["ALL EVENTS", "TECHNICAL", "CULTURAL"];
const DEPT_FILTERS = ["ALL DEPTS", "CSE/AIML", "IT", "ECE/EEE", "MECH", "GENERAL"];

export default function Events() {
  const [activeType, setActiveType] = useState("ALL EVENTS");
  const [activeDept, setActiveDept] = useState("ALL DEPTS");

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const typeMatch = activeType === "ALL EVENTS" || 
        (activeType === "TECHNICAL" && event.type.toUpperCase() === "TECH") ||
        (activeType === "CULTURAL" && event.type.toUpperCase() === "CULTURAL");
      
      const deptMatch = activeDept === "ALL DEPTS" || 
        event.department.toUpperCase().includes(activeDept.split('/')[0]);
      
      return typeMatch && deptMatch;
    });
  }, [activeType, activeDept]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '64px', paddingLeft: '16px', paddingRight: '16px', backgroundColor: '#0a0f14' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '28px', color: '#c8ff00', marginBottom: '16px' }}>EVENTS</h1>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>
            Choose your challenge. Compete for glory, prizes, and bragging rights.
          </p>
        </div>

        {/* Type Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0', marginBottom: '24px' }}>
          {TYPE_FILTERS.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              style={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '9px',
                padding: '12px 24px',
                border: '1px solid',
                borderColor: activeType === type ? '#c8ff00' : '#4b5563',
                backgroundColor: activeType === type ? '#c8ff00' : 'transparent',
                color: activeType === type ? '#000' : '#9ca3af',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Department Filters */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '8px', color: '#6b7280', marginBottom: '12px' }}>DEPARTMENTS</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0' }}>
            {DEPT_FILTERS.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '8px',
                  padding: '8px 16px',
                  borderTop: '1px solid',
                  borderBottom: '1px solid',
                  borderRight: '1px solid',
                  borderLeft: 'none',
                  borderColor: activeDept === dept ? '#c8ff00' : '#374151',
                  backgroundColor: activeDept === dept ? '#c8ff00' : 'transparent',
                  color: activeDept === dept ? '#000' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid - Using inline styles for 3-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px'
        }}>
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.02 }}
              >
                <Link href={`/events/${event.id}`}>
                  <div style={{
                    backgroundColor: '#0d1520',
                    border: '1px solid rgba(200,255,0,0.4)',
                    borderRadius: '4px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#c8ff00'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(200,255,0,0.4)'}
                  >
                    {/* Top Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <span style={{
                        fontFamily: '"Press Start 2P", cursive',
                        fontSize: '7px',
                        backgroundColor: '#c8ff00',
                        color: '#000',
                        padding: '4px 8px'
                      }}>
                        {event.department.toUpperCase()}
                      </span>
                      <span style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '8px', color: '#6b7280' }}>
                        ⏱ {event.startTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: '13px',
                      color: '#c8ff00',
                      marginBottom: '12px',
                      lineHeight: '1.6'
                    }}>
                      {event.title.toUpperCase()}
                    </h3>

                    {/* Description */}
                    <p style={{
                      color: '#9ca3af',
                      fontSize: '12px',
                      lineHeight: '1.6',
                      marginBottom: '20px',
                      flex: '1'
                    }}>
                      {event.shortDescription}
                    </p>

                    {/* Bottom Row */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '9px',
                      paddingTop: '16px',
                      borderTop: '1px solid #1f2937'
                    }}>
                      <span style={{ color: '#22d3ee' }}>🏆 {event.prize}</span>
                      <span style={{ color: '#6b7280' }}>👤 INDIVIDUAL</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '14px', color: '#4b5563' }}>NO EVENTS FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
}
