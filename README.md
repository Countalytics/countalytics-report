## Instructions
1. Save Excel data as CSV in the following format ([example](docs/assets/consumption.csv)).
2. Convert CSV to JSON using this tool (https://www.csvjson.com/csv2json), copy-all JSON data and paste into a file called `consumption.json`.
3. Delete old consumption.json in this [folder](docs/assets/).
3. Upload the new consumption.json file you created into this same `docs/assets/` [folder](docs/assets/).
4. Clear browser history in last hour / wait a while for the changes to appear.

### Notes
- Follow the CSV format strictly to ensure all fields and filters work properly.
- Flight filter would show error if selected flight does not correspond with the other filters selected (e.g. ATL, LAX, DL 0843 would lead to an error).
