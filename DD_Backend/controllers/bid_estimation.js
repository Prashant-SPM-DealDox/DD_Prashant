// const db = require("../routes/db-config")
// const jwt  = require("jsonwebtoken");
const md5  = require("md5");
const Excel = require('exceljs');
const FormulaParser = require('hot-formula-parser').Parser;
var base_url = process.env.BASE_URL;

const parser = new FormulaParser();

function getCellResult(worksheet, cellLabel) {
  if (worksheet.getCell(cellLabel).formula) {
    return parser.parse(worksheet.getCell(cellLabel).formula).result;
  } else {
    return worksheet.getCell(cellLabel).value;
  }
}

module.exports = {
    
     calculation: async function(req, res) {
        var workval = await workbook.xlsx.readFile(__dirname+'/../excel/PCR_EXAMPLE_EXCEL_RZ.xlsx').then(function() {
            var worksheet = workbook.getWorksheet(1);
            var worksheet2 = workbook.getWorksheet(3);

            parser.on('callCellValue', function(cellCoord, done) {
                if (worksheet.getCell(cellCoord.label).formula) {
                    done(parser.parse(worksheet.getCell(cellCoord.label).formula).result);
                } else {
                    done(worksheet.getCell(cellCoord.label).value);
                }
            });
  
            parser.on('callRangeValue', function(startCellCoord, endCellCoord, done) {
                var fragment = [];
  
                for (var row = startCellCoord.row.index; row <= endCellCoord.row.index; row++) {
                    var colFragment = [];
  
                    for (var col = startCellCoord.column.index; col <= endCellCoord.column.index; col++) {
                        colFragment.push(worksheet.getRow(row + 1).getCell(col + 1).value);
                    }
  
                    fragment.push(colFragment);
                }
  
                if (fragment) {
                    done(fragment);
                }
            });

            var B = 17;
            

            for(var i=0; i<req.body.data.length;i++)
            {
                var user_id = req.user.user_id;
                var account_id = req.body.data[i].account_id;
                var opportunity_id = req.body.data[i].opportunity_id;
                var template_type = req.body.data[i].template_type;
                var level = req.body.data[i].level;
                var unit_price = req.body.data[i].unit_price;
                var bid_price = req.body.data[i].bid_price;
                var workload = req.body.data[i].workload;
                var csp_workload = req.body.data[i].csp_workload;
                var csp_avg_cost = req.body.data[i].csp_avg_cost;
                var non_billable = req.body.data[i].non_billable;
                var country = req.body.data[i].country;
                var role = req.body.data[i].role;
                var role_description = req.body.data[i].role_description;
                var notes = req.body.data[i].notes;

                // db.query('INSERT INTO bid_estimation SET ?',{user_id:user_id, account_id:account_id, opportunity_id:opportunity_id, template_type:template_type, level:level, unit_price: unit_price, bid_price: bid_price, workload:workload, csp_workload:csp_workload, csp_avg_cost:csp_avg_cost, non_billable:non_billable, country:country, role:role, role_description:role_description, notes:notes}, (error, results)=> {
                //     if (error) {
                //         throw error;
                //         // req.flash("error","Failed to Created!")
                //         // res.redirect("/")
                //     }
                // });

                worksheet.getCell('A'+B).value = req.body.data[i].level;
                worksheet.getCell('B'+B).value = req.body.data[i].bid_price;
                // worksheet.getCell('B'+B).formula = '=IF(C'+B+'=1200,1000,IF(C'+B+'=1000,800,(C'+B+'=1500,1300,IF(C'+B+'=2000,1800,""))))';

                worksheet.getCell('C'+B).value = req.body.data[i].unit_price;
                // worksheet.getCell('C'+B).formula = '=IF(A'+B+'="L3 Associate Consultant",1200,IF(A'+B+'="L2 Graduate Consultant",1000,IF(A'+B+'="L4 Project Manager",1500,IF(A'+B+'="L5 Global Program Manager",2000,""))))';

                worksheet.getCell('G'+B).value = req.body.data[i].workload;
                worksheet.getCell('D'+B).formula = '=IF(A'+B+'="L2 GRADUATE CONSULTANT",10.71,IF(A'+B+'="L3 ASSOCIATE CONSULTANT",16.55,IF(A'+B+'="L3 CONSULTANT",20.9,IF(A'+B+'="L4 PROJECT MANAGER",25.91,""))))';
                // worksheet.getCell('F'+B).value = req.body.data[i].level;
                // worksheet.getCell('G'+B).value = req.body.data[i].level;
                // worksheet.getCell('H'+B).value = req.body.data[i].level;
                // worksheet.getCell('I'+B).value = req.body.data[i].level;
                // worksheet.getCell('J'+B).value = req.body.data[i].level;

                // var cellnum = worksheet2.findCell(req.body.data[i].level);
                // console.log(cellnum+"::"+req.body.data[i].level)
                
                
                // worksheet.getCell('N'+B).value = getCellResult(worksheet, 'G'+B);

                // // worksheet.getCell('N'+B).value = req.body.data[i].unit_price*req.body.data[i].workload;

                // worksheet.getCell('O'+B).value = getCellResult(worksheet, 'F'+B);

                // // worksheet.getCell('O'+B).value = req.body.data[i].bid_price*req.body.data[i].workload;


                // var val_2 = 3;
                // for(var j=3;j<=15;j++)
                // {
                //     if(worksheet2.getCell('F'+j).value == req.body.data[i].level){
                //         break;

                //     }
                //     val_2++;
                // }
                // worksheet.getCell('I'+B).value = worksheet2.getCell('G'+val_2).value;
                // worksheet.getCell('I'+B).formula = "=VLOOKUP(B4,Sheet3!F4:G16,2)";
                // // worksheet.getCell('P'+B).value = worksheet2.getCell('G'+val_2).value;

                // worksheet.getCell('P'+B).value = getCellResult(worksheet, 'J'+B);

                // console.log("N20 :: "+worksheet2.getCell('G'+val_2).value);



                B++;
                

            }
            // worksheet.getCell('B2').value = req.body.puchaseprice; // B2's value set

            // worksheet.getCell('B3').value = req.body.downpayment; // B3's value set

            // worksheet.getCell('B4').value  = req.body.tradeinvalue; // B4's value set

            // worksheet.getCell('B5').value  = parseFloat(req.body.interestrate); // B5's value set
    
            // worksheet.getCell('B6').value  = req.body.lengthofloan; // B6's value set
            // console.log(worksheet.getCell('B9').value);
            // var month = getCellResult(worksheet, 'B8');
            // var tot = getCellResult(worksheet, 'B9');

            // worksheet.getCell('B8').value  = { formula: 'PMT(B5/12,B6,B2-(B3+B4))', result: getCellResult(worksheet, 'B8') };
            // worksheet.getCell('B9').value  = { formula: '-(B8*B6)+(B3+B4)', result: getCellResult(worksheet, 'B9') };

            var total_listprice = getCellResult(worksheet, 'E8');
            var discount_listprice = getCellResult(worksheet, 'E9');
            var total_netprice = getCellResult(worksheet, 'E10');
            var total_cost = getCellResult(worksheet, 'D17');
            var total_margin = getCellResult(worksheet, 'E11');
            

            return {total_listprice : total_listprice, discount_listprice:discount_listprice, total_netprice:total_netprice, total_cost:total_cost, total_margin:total_margin};
  
        });
        res.status(200).send({ success: "Successfully Calculated!", total:workval });
     },

    get:async function(user, accid, oppid, template_type, callback){
        db.query('SELECT * FROM bid_estimation WHERE user_id='+user.user_id+' and account_id="'+accid+'" and opportunity_id="'+oppid+'" and template_type="'+template_type+'"' ,async (error, results)=> {
            if (error) {
                throw error;
            }

            var workbook = new Excel.Workbook();
          var workval = await workbook.xlsx.readFile(__dirname+'/../excel/DD_EXCEL_CLC_ENGINE.xlsx').then(function() {
            var worksheet = workbook.getWorksheet(1);
            var worksheet2 = workbook.getWorksheet(3);

            parser.on('callCellValue', function(cellCoord, done) {
                if (worksheet.getCell(cellCoord.label).formula) {
                    done(parser.parse(worksheet.getCell(cellCoord.label).formula).result);
                } else {
                    done(worksheet.getCell(cellCoord.label).value);
                }
            });
  
            parser.on('callRangeValue', function(startCellCoord, endCellCoord, done) {
                var fragment = [];
  
                for (var row = startCellCoord.row.index; row <= endCellCoord.row.index; row++) {
                    var colFragment = [];
  
                    for (var col = startCellCoord.column.index; col <= endCellCoord.column.index; col++) {
                        colFragment.push(worksheet.getRow(row + 1).getCell(col + 1).value);
                    }
  
                    fragment.push(colFragment);
                }
  
                if (fragment) {
                    done(fragment);
                }
            });

            var B = 3;
            

            for(var i=0; i<results.length;i++)
            {
                worksheet.getCell('B'+B).value = results[i].level;
                worksheet.getCell('C'+B).value = results[i].unit_price;
                worksheet.getCell('D'+B).value = results[i].bid_price;
                worksheet.getCell('E'+B).value = results[i].workload;
                
                worksheet.getCell('N'+B).value = getCellResult(worksheet, 'G'+B);

                worksheet.getCell('O'+B).value = getCellResult(worksheet, 'F'+B);

                var val_2 = 3;
                for(var j=3;j<=15;j++)
                {
                    if(worksheet2.getCell('F'+j).value == results[i].level){
                        break;

                    }
                    val_2++;
                }
                worksheet.getCell('I'+B).value = worksheet2.getCell('G'+val_2).value;
                worksheet.getCell('I'+B).formula = "=VLOOKUP(B4,Sheet3!F4:G16,2)";
                // worksheet.getCell('P'+B).value = worksheet2.getCell('G'+val_2).value;

                worksheet.getCell('P'+B).value = getCellResult(worksheet, 'J'+B);

                console.log("N20 :: "+worksheet2.getCell('G'+val_2).value);



                B++;
            }
            var total_listprice = getCellResult(worksheet, 'N20');
            var discount_listprice = getCellResult(worksheet, 'O20');
            var total_netprice = getCellResult(worksheet, 'P20');
            var total_cost = getCellResult(worksheet, 'P23');
            var total_margin = getCellResult(worksheet, 'O23');
            

            return {total_listprice : total_listprice, discount_listprice:discount_listprice, total_netprice:total_netprice, total_cost:total_cost, total_margin:total_margin};
          })

            const res_data = {bid_data:results,excel:workval};
            callback(null, res_data);
        })
    },

}