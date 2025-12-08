import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Mail, Download, MapPin, Calendar } from "lucide-react"

export function HeroSection() {
  const currentProjects = [
    "Plant Disease Detection AI",
    "Hotel Booking System",
    "Portfolio Website"
  ]

  const recentCertifications = [
    "Prompt Engineering",
    "Advanced JavaScript",
    "Cloud Computing",
    "C++ Programming"
  ]

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Hero Content */}
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Salem, Tamil Nadu</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Hi, I'm{" "}
              <span className="bg-hero-gradient bg-clip-text text-transparent">
                Prakash M
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground font-medium">
              python developer with a passion for AI and web development.
            </p>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Crafting innovative web solutions with modern technologies. 
              Passionate about AI integration and creating seamless user experiences.
              Currently pursuing opportunities in full-stack development.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button className="bg-hero-gradient hover:shadow-premium transition-all duration-300">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </Button>
            <Button variant="outline" className="hover:bg-primary/10 hover:border-primary">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" size="sm" className="hover:bg-primary/10">
              <Github className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-primary/10">
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-primary/10">
              <Mail className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Side - Dynamic Content Cards */}
        <div className="space-y-6 animate-fade-in">
          {/* Current Projects Card */}
          <Card className="p-6 bg-card-gradient shadow-card-soft hover:shadow-premium transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Current Projects
            </h3>
            <div className="space-y-2">
              {currentProjects.map((project, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse"></div>
                  <span className="text-sm text-muted-foreground">{project}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills Overview */}
          <Card className="p-6 bg-card-gradient shadow-card-soft hover:shadow-premium transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4">Core Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Python", "MySQL", "Cloud", "AI/ML"].map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-tech-gradient text-white border-0">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Recent Achievements */}
          <Card className="p-6 bg-card-gradient shadow-card-soft hover:shadow-premium transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4">Recent Certifications</h3>
            <div className="grid grid-cols-2 gap-2">
              {recentCertifications.map((cert, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  ✓ {cert}
                </div>
              ))}
            </div>
          </Card>

          {/* Internship Status */}
          <Card className="p-6 bg-card-gradient shadow-card-soft hover:shadow-premium transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Web Developer Intern</span>
                <Badge variant="outline" className="border-primary text-primary">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Optimus Pvt Ltd</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}