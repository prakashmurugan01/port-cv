import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

const Index = () => {
  const [activeSection, setActiveSection] = useState("home")
  const { isAdmin } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section === "home" ? "hero" : section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId === "home" ? "hero" : sectionId
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionClick={scrollToSection} />
      
      {/* Admin Panel Access */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button asChild variant="secondary" size="sm">
            <Link to="/admin">
              <Settings className="h-4 w-4 mr-2" />
              Admin Panel
            </Link>
          </Button>
        </div>
      )}
      
      <main>
        <div id="hero">
          <HeroSection />
        </div>
        
        <div id="projects">
          <ProjectsSection />
        </div>
        
        <div id="skills">
          <SkillsSection />
        </div>
        
        <div id="contact">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Prakash M. Built with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
};

export default Index;
