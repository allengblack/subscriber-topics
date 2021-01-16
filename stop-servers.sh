kill $(lsof -i:8000 | awk 'NR==2 {print $2}')
kill $(lsof -i:9000 | awk 'NR==2 {print $2}')
echo "Stopped servers running at ports 8000 & 9000"