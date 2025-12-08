import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code, Database, Cloud, Brain, Palette, Server } from "lucide-react"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      skills: [
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "JavaScript", level: 88 },
        { name: "React", level: 85 },
        { name: "TypeScript", level: 75 }
      ]
    },
    {
      title: "Backend Development", 
      icon: Server,
      skills: [
        { name: "Python", level: 90 },
        { name: "Node.js", level: 75 },
        { name: "Flask", level: 85 },
        { name: "Express.js", level: 70 },
        { name: "RESTful APIs", level: 80 }
      ]
    },
    {
      title: "Database Management",
      icon: Database,
      skills: [
        { name: "MySQL", level: 85 },
        { name: "PostgreSQL", level: 70 },
        { name: "MongoDB", level: 65 },
        { name: "Database Design", level: 80 },
        { name: "Query Optimization", level: 75 }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: [
        { name: "AWS", level: 70 },
        { name: "Google Cloud", level: 65 },
        { name: "Docker", level: 60 },
        { name: "Git/GitHub", level: 90 },
        { name: "CI/CD", level: 55 }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: Brain,
      skills: [
        { name: "TensorFlow", level: 75 },
        { name: "OpenCV", level: 70 },
        { name: "Scikit-learn", level: 65 },
        { name: "Deep Learning", level: 70 },
        { name: "Computer Vision", level: 75 }
      ]
    },
    {
      title: "Design & Tools",
      icon: Palette,
      skills: [
        { name: "Figma", level: 70 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Bootstrap", level: 85 },
        { name: "Responsive Design", level: 95 },
        { name: "UI/UX Principles", level: 75 }
      ]
    }
  ]

  const certifications = [
    "Prompt Engineering for ChatGPT",
    "Advanced JavaScript Concepts", 
    "C++ Programming Fundamentals",
    "Cloud Computing Essentials",
    "Database Management Systems",
    "Web Development Best Practices",
    "AI/ML Foundations",
    "Version Control with Git"
  ]

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Skills & <span className="bg-hero-gradient bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technical skills across the full development stack, 
            from frontend interfaces to AI-powered backend systems.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card 
                key={index}
                className="bg-card-gradient shadow-card-soft hover:shadow-premium transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2 bg-muted"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Certifications */}
        <Card className="bg-card-gradient shadow-premium animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl text-center">Professional Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {certifications.map((cert, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="p-3 text-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-default"
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}