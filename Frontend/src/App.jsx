import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e1e24",
              color: "#f5f5f5",
              border: "1px solid rgba(225, 3, 77, 0.35)",
              boxShadow: "0 4px 12px rgba(225, 3, 77, 0.15)",
              borderRadius: "0.75rem",
              fontFamily: "system-ui, -apple-system, sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#e1034d",
                secondary: "#1e1e24",
              },
              style: {
                border: "1px solid rgba(225, 3, 77, 0.5)",
                boxShadow: "0 4px 16px rgba(225, 3, 77, 0.25)",
              }
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#1e1e24",
              },
              style: {
                border: "1px solid rgba(239, 68, 68, 0.5)",
                boxShadow: "0 4px 16px rgba(239, 68, 68, 0.25)",
              }
            },
            loading: {
              style: {
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
              }
            }
          }}
        />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
