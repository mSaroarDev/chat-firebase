import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { router } from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import ChatsProviders from "./providers/ChatsProvider";
import MessageProviders from "./providers/MessageProvider";

function App() {

  return (
    <>
      <Toaster />
      <AuthProvider>
        <ChatsProviders>
          <MessageProviders>
            <RouterProvider router={router}>
              <div>
                <h1>Hello</h1>
              </div>
            </RouterProvider>
          </MessageProviders>
        </ChatsProviders>
      </AuthProvider>
    </>
  )
}

export default App;
