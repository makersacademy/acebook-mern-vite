osascript -e 'tell app "Terminal"
    do script "cd api && npm run dev"
end tell'
osascript -e 'tell app "Terminal"
    do script "cd frontend && npm run dev"
end tell'