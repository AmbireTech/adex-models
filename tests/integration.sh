#/usr/bin/env node

TIMESTAMP=`date +%s`

PORT=3333
MOCK_SERVER_URL="http://localhost:$PORT"

node ./tests/setUpMockServer.js &
sleep 6

MOCK_SERVER_URL=$MOCK_SERVER_URL node ./tests/index.js

exitCode=$?

echo "$exitCode"

# end all processes
pkill -P $$

exit $exitCode
