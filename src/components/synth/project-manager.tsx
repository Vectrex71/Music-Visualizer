'use client'

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folders, Loader2, Plus, Save, Trash2, Upload } from 'lucide-react';
import type { VisualizationProject, WithId } from '@/lib/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type ProjectManagerProps = {
  isPro: boolean;
  onUpgrade: () => void;
  savedProjects: WithId<VisualizationProject>[];
  onSaveProject: (name: string) => void;
  onLoadProject: (project: VisualizationProject) => void;
  onDeleteProject: (projectId: string) => void;
  isProcessing: boolean;
  className?: string;
};

function ProjectManager({
  isPro,
  onUpgrade,
  savedProjects,
  onSaveProject,
  onLoadProject,
  onDeleteProject,
  isProcessing,
  className
}: ProjectManagerProps) {

  const [isSaveAlertOpen, setIsSaveAlertOpen] = React.useState(false);
  const [newProjectName, setNewProjectName] = React.useState('');

  const handleSaveClick = () => {
    if (newProjectName.trim()) {
      onSaveProject(newProjectName.trim());
      setIsSaveAlertOpen(false);
      setNewProjectName('');
    }
  };
  
  const canSave = savedProjects.length < 3;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <Folders className="w-5 h-5 text-muted-foreground" />
                    Project Slots
                </CardTitle>
                <CardDescription>{savedProjects.length} of 3 slots used.</CardDescription>
            </div>
             <AlertDialog open={isSaveAlertOpen} onOpenChange={setIsSaveAlertOpen}>
              <AlertDialogTrigger asChild>
                <Button size="sm" disabled={isProcessing || !canSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Current
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Save Project</AlertDialogTitle>
                  <AlertDialogDescription>
                    Give your new project a name.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                    <Label htmlFor="project-name" className="sr-only">Project Name</Label>
                    <Input 
                        id="project-name"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        placeholder="My Awesome Visualization"
                    />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSaveClick} disabled={!newProjectName.trim()}>Save</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        {isProcessing && savedProjects.length === 0 ? (
           <div className="flex h-40 w-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-3">
            {savedProjects.length > 0 ? (
              savedProjects.map(project => (
                <div key={project.id} className="flex items-center justify-between gap-2 p-3 rounded-md border bg-secondary/50">
                    <p className="font-semibold truncate">{project.name}</p>
                    <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" onClick={() => onLoadProject(project)} disabled={isProcessing}>
                            <Upload className="h-4 w-4 mr-2" /> Load
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive/80 hover:text-destructive" disabled={isProcessing}>
                                  <Trash2 className="h-4 w-4" />
                              </Button>
                           </AlertDialogTrigger>
                           <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete your project "{project.name}". This action cannot be undone.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDeleteProject(project.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Delete
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
              ))
            ) : (
                 <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg">
                    <h3 className="font-semibold">No Projects Saved</h3>
                    <p className="mt-1 text-sm">Click the "Save Current" button to save your first project.</p>
                </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default React.memo(ProjectManager);

