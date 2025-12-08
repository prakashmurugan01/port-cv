import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Brain, Hotel, Globe } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "Plant Disease Detection AI",
      description: "Advanced machine learning model for identifying plant diseases through image analysis. Built with Python, TensorFlow, and Flask with real-time prediction capabilities.",
      icon: Brain,
      features: [
        "Image upload and preprocessing",
        "CNN-based disease classification",
        "95% accuracy on test dataset",
        "Real-time prediction API",
        "Web interface for farmers"
      ],
      technologies: ["Python", "TensorFlow", "Flask", "OpenCV", "HTML/CSS"],
      status: "Completed",
      github: "#",
      demo: "#"
    },
    {
      title: "Xplore-IT-Hub-Institution-Management-System",
      description: "Xplore_IT_hub — a modular Django learning-management platform featuring courses, assignments, attendance, and real-time notifications. Uses Django REST Framework, Channels (WebSockets), Celery for background tasks, and is built for tests, containerized deployment, and easy extension.",
      icon: Globe,
      features: [
        "User registration & authentication",
        "Course management & enrollment",
        "Assignment submission & grading",
        "Real-time notifications",
        "Admin dashboard for management"
      ],
      technologies: ["Django", "Django REST Framework", "Redis", ],
      status: "In Progress",
      github: "#",
      demo: "#" // Placeholder for demo link
    },
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website with dark/light theme, admin panel, and dynamic content management.",
      icon: Globe,
      features: [
        "Responsive design",
        "Dark/Light theme toggle",
        "Admin authentication",
        "Dynamic content management",
        "Contact form integration"
      ],
      technologies: ["React", "TypeScript", "Tailwind", "Supabase"],
      status: "Active",
      github: "#",
      demo: "#"
    }
  ]

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured <span className="bg-hero-gradient bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcase of my recent work in web development and AI. Each project demonstrates 
            different aspects of modern software development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <Card 
                key={index} 
                className="bg-card-gradient shadow-card-soft hover:shadow-premium transition-all duration-500 animate-scale-in group overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge 
                      variant={project.status === "Completed" ? "default" : 
                               project.status === "In Progress" ? "secondary" : "outline"}
                      className={project.status === "Active" ? "bg-tech-gradient border-0 text-white" : ""}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="mt-2 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Key Features</h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-floating"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-border/50">
                    <Button size="sm" variant="outline" className="flex-1 hover:bg-primary/10">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" className="flex-1 bg-tech-gradient hover:shadow-glow">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}