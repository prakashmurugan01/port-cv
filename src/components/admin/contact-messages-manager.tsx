import React, { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import { Mail, Trash2, Eye, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  created_at: string
}

export const ContactMessagesManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch contact messages',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast({
        title: 'Success',
        description: 'Message deleted successfully',
      })
      
      fetchMessages()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive',
      })
    }
  }

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setDialogOpen(true)
  }

  const handleReply = (email: string, subject: string) => {
    const mailtoLink = `mailto:${email}?subject=Re: ${subject || 'Your Contact Form Message'}`
    window.open(mailtoLink, '_blank')
  }

  if (loading) {
    return <div>Loading contact messages...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contact Messages</h2>
          <p className="text-muted-foreground">
            Manage and respond to contact form submissions ({messages.length} total)
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                <p className="text-muted-foreground">
                  Contact form submissions will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => (
            <Card key={message.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{message.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {message.email}
                    </CardDescription>
                    {message.subject && (
                      <Badge variant="outline">{message.subject}</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(message.created_at), 'MMM dd, yyyy HH:mm')}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm line-clamp-3">{message.message}</p>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => handleReply(message.email, message.subject || '')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewMessage(message)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Full
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(message.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Message Details</DialogTitle>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Name</h4>
                  <p>{selectedMessage.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Email</h4>
                  <p>{selectedMessage.email}</p>
                </div>
              </div>
              
              {selectedMessage.subject && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Subject</h4>
                  <p>{selectedMessage.subject}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Message</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Received</h4>
                <p>{format(new Date(selectedMessage.created_at), 'MMMM dd, yyyy at HH:mm')}</p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                >
                  Close
                </Button>
                <Button 
                  onClick={() => handleReply(selectedMessage.email, selectedMessage.subject || '')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Reply to {selectedMessage.name}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}