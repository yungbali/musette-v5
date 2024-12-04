import { useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { generateClient } from 'aws-amplify/api'
import { Schema } from '../../amplify/data/resource'

const client = generateClient<Schema>()

export function AlbumArtwork() {
  const [loading, setLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    albumTitle: '',
    artistName: '',
    genre: '',
    mood: '',
    style: 'digital',
    colorScheme: '',
    additionalNotes: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const generateArtwork = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await client.generations.albumArtGenerator({
        ...formData
      })
      setGeneratedImage(data)
    } catch (error) {
      console.error('Error generating artwork:', error)
      setError('Failed to generate artwork. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Album Artwork</CardTitle>
        <CardDescription>Generate unique artwork for your album using AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        {generatedImage && (
          <div className="mb-4">
            <img src={generatedImage} alt="Generated artwork" className="w-full rounded-lg" />
          </div>
        )}
        <div className="space-y-4">
          <div>
            <Label htmlFor="albumTitle">Album Title</Label>
            <Input 
              id="albumTitle" 
              placeholder="Enter album title"
              onChange={handleInputChange}
              value={formData.albumTitle}
            />
          </div>
          <div>
            <Label htmlFor="artistName">Artist Name</Label>
            <Input 
              id="artistName" 
              placeholder="Enter artist name"
              onChange={handleInputChange}
              value={formData.artistName}
            />
          </div>
          <div>
            <Label htmlFor="genre">Genre</Label>
            <Select onValueChange={(value) => handleSelectChange('genre', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="hip-hop">Hip Hop</SelectItem>
                <SelectItem value="electronic">Electronic</SelectItem>
                <SelectItem value="jazz">Jazz</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="mood">Mood</Label>
            <Input 
              id="mood" 
              placeholder="e.g., energetic, melancholic, upbeat"
              onChange={handleInputChange}
              value={formData.mood}
            />
          </div>
          <div>
            <Label htmlFor="colorScheme">Color Scheme</Label>
            <Input 
              id="colorScheme" 
              placeholder="e.g., dark and moody, bright and colorful"
              onChange={handleInputChange}
              value={formData.colorScheme}
            />
          </div>
          <div>
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea 
              id="additionalNotes"
              placeholder="Any specific details or requirements?"
              onChange={handleInputChange}
              value={formData.additionalNotes}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={generateArtwork}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Generating...' : 'Generate Artwork'}
        </Button>
      </CardFooter>
    </Card>
  )
}