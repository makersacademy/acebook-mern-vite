osascript -e 'tell app "Terminal"
    do script "cd ./api && npm install && npm run build"
end tell'
osascript -e 'tell app "Terminal"
    do script "cd ./frontend && npm install && npm run build"
end tell'

# ttab -d ./api npm run build
# ttab -d ./frontend npm run build