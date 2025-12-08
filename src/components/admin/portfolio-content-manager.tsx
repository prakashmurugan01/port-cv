import React, { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Plus, Edit, Trash2, FileText } from 'lucide-react'

interface PortfolioContent {
  id: string
  section: string
  title: string
  content: string | null
  order_index: number
  is_active: boolean
  metadata: any
  created_at: string
  updated_at: string
}

interface ContentFormData {
  section: string
  title: string
  content: string
  order_index: number
  is_active: boolean
  metadata: string
}

const contentSections = [
  'hero',
  'about',
  'experience',
  'education',
  'achievements',
  'testimonials',
  'services',
  'blog',
  'other'
]

export const PortfolioContentManager = () => {
  const [content, setContent] = useState<PortfolioContent[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<PortfolioContent | null>(null)

  const form = useForm<ContentFormData>({
    defaultValues: {
      section: '',
      title: '',
      content: '',
      order_index: 0,
      is_active: true,
      metadata: '{}',
    },
  })

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_content')
        .select('*')
        .order('section', { ascending: true })
        .order('order_index', { ascending: true })

      if (error) throw error
      setContent(data || [])
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch portfolio content',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const onSubmit = async (data: ContentFormData) => {
    try {
      let metadata = {}
      try {
        metadata = data.metadata ? JSON.parse(data.metadata) : {}
      } catch (e) {
        toast({
          title: 'Error',
          description: 'Invalid JSON in metadata field',
          variant: 'destructive',
        })
        return
      }

      const contentData = {
        section: data.section,
        title: data.title,
        content: data.content || null,
        order_index: data.order_index,
        is_active: data.is_active,
        metadata,
      }

      if (editingContent) {
        const { error } = await supabase
          .from('portfolio_content')
          .update(contentData)
          .eq('id', editingContent.id)

        if (error) throw error
        
        toast({
          title: 'Success',
          description: 'Content updated successfully',
        })
      } else {
        const { error } = await supabase
          .from('portfolio_content')
          .insert([contentData])

        if (error) throw error
        
        toast({
          title: 'Success',
          description: 'Content created successfully',
        })
      }

      setDialogOpen(false)
      setEditingContent(null)
      form.reset()
      fetchContent()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save content',
        variant: 'destructive',
      })
    }
  }

  const handleEdit = (contentItem: PortfolioContent) => {
    setEditingContent(contentItem)
    form.reset({
      section: contentItem.section,
      title: contentItem.title,
      content: contentItem.content || '',
      order_index: contentItem.order_index,
      is_active: contentItem.is_active,
      metadata: JSON.stringify(contentItem.metadata || {}, null, 2),
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return

    try {
      const { error } = await supabase
        .from('portfolio_content')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast({
        title: 'Success',
        description: 'Content deleted successfully',
      })
      
      fetchContent()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete content',
        variant: 'destructive',
      })
    }
  }

  const handleNewContent = () => {
    setEditingContent(null)
    form.reset()
    setDialogOpen(true)
  }

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = []
    }
    acc[item.section].push(item)
    return acc
  }, {} as Record<string, PortfolioContent[]>)

  if (loading) {
    return <div>Loading portfolio content...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Content</h2>
          <p className="text-muted-foreground">Manage additional content sections for your portfolio</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewContent}>
              <Plus className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingContent ? 'Edit Content' : 'Add New Content'}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {contentSections.map((section) => (
                              <SelectItem key={section} value={section}>
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="order_index"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={6} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metadata"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metadata (JSON)</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4} 
                          placeholder='{"key": "value"}'
                          className="font-mono text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Active</FormLabel>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingContent ? 'Update' : 'Create'} Content
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {contentSections.map((section) => {
          const sectionContent = groupedContent[section] || []
          if (sectionContent.length === 0) return null

          return (
            <Card key={section}>
              <CardHeader>
                <CardTitle className="capitalize">{section}</CardTitle>
                <CardDescription>{sectionContent.length} items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectionContent.map((item) => (
                    <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{item.title}</h4>
                          {!item.is_active && <Badge variant="destructive">Inactive</Badge>}
                        </div>
                        {item.content && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.content}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
        
        {Object.keys(groupedContent).length === 0 && (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No content yet</h3>
                <p className="text-muted-foreground">
                  Start by adding content sections for your portfolio
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}