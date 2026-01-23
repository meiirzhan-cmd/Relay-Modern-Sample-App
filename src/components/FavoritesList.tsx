import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Info, Star, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface Favorite {
  id: string;
  name: string;
  type: "film" | "character" | "planet" | "starship";
  addedAt: Date;
}

const typeColors: Record<
  Favorite["type"],
  "default" | "blue" | "green" | "cyan"
> = {
  film: "default",
  character: "blue",
  planet: "green",
  starship: "cyan",
};

const FavoritesList = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([
    { id: "1", name: "Luke Skywalker", type: "character", addedAt: new Date() },
    {
      id: "2",
      name: "Millennium Falcon",
      type: "starship",
      addedAt: new Date(),
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<Favorite["type"]>("character");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFavorite = async () => {
    if (!newName.trim()) return;

    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newFavorite: Favorite = {
      id: Date.now().toString(),
      name: newName.trim(),
      type: newType,
      addedAt: new Date(),
    };

    setFavorites((prev) => [...prev, newFavorite]);
    setNewName("");
    setIsDialogOpen(false);
    setIsLoading(false);
  };

  const handleRemoveFavorite = async (id: string) => {
    // Simulate optimistic update with network delay
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 rounded-lg bg-sw-blue/10 border border-sw-blue/30">
        <Info className="h-5 w-5 text-sw-blue shrink-0" />
        <p className="text-sm text-gray-300">
          <strong className="text-sw-blue">Mutation Demo:</strong> This
          component demonstrates the mutation pattern using local state. In a
          real app with a writable GraphQL backend, you would use{" "}
          <code className="bg-space-gray px-1 rounded">useMutation</code> from
          react-relay.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-sw-yellow" />
            My Favorites
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Favorite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Favorite</DialogTitle>
                <DialogDescription>
                  Add a Star Wars item to your favorites list.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label
                    htmlFor="favorite-name"
                    className="text-sm text-gray-400"
                  >
                    Name
                  </label>
                  <Input
                    id="favorite-name"
                    placeholder="Enter name..."
                    value={newName}
                    name={"name"}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <fieldset className="space-y-2 border-0 p-0 m-0">
                  <legend className="text-sm text-gray-400">Type</legend>
                  <div className="flex flex-wrap gap-2">
                    {(["film", "character", "planet", "starship"] as const).map(
                      (type) => (
                        <Button
                          key={type}
                          size="sm"
                          variant={newType === type ? "default" : "outline"}
                          onClick={() => setNewType(type)}
                          className="capitalize"
                        >
                          {type}
                        </Button>
                      ),
                    )}
                  </div>
                </fieldset>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleAddFavorite}
                  disabled={!newName.trim() || isLoading}
                >
                  {isLoading ? "Adding..." : "Add to Favorites"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {favorites.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No favorites yet. Add some items to get started!
            </p>
          ) : (
            <div className="space-y-3">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-space-gray/50 border border-space-light/30 hover:border-sw-yellow/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={typeColors[favorite.type]}
                      className="capitalize"
                    >
                      {favorite.type}
                    </Badge>
                    <span className="font-medium">{favorite.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">
                      {favorite.addedAt.toLocaleDateString()}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-sw-red hover:bg-sw-red/10"
                      onClick={() => handleRemoveFavorite(favorite.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-space-gray/30">
        <CardHeader>
          <CardTitle className="text-base text-gray-400">
            Mutation Code Example
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs text-gray-400 overflow-x-auto p-4 bg-space-black rounded-lg">
            {`// Real mutation example with useMutation:
const [commit, isInFlight] = useMutation(
  graphql\`
    mutation AddFavoriteMutation($input: AddFavoriteInput!) {
      addFavorite(input: $input) {
        favorite {
          id
          name
          type
        }
      }
    }
  \`
);

const handleAdd = () => {
  commit({
    variables: { input: { name, type } },
    onCompleted: (data) => {
      console.log('Success:', data);
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });
};`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default FavoritesList;
