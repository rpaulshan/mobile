//
//  TTUserTableViewController.swift
//  TimeTracker3
//
//  Created by Bharath Sundararaman on 1/19/16.
//  Copyright © 2016 Startup. All rights reserved.
//

import UIKit

class TTUserTableViewController: UITableViewController {

    //var items = [String]()
    var items = NSMutableArray()
    
    func addDummyData() {
        RestApiManager.sharedInstance.getRandomUser { json in
            //            let results = json["results"]
            //            for (index: _ , subJson: mySubJSON) in results {
            //                let user: AnyObject = mySubJSON["user"].object
            //                self.items.addObject(user)
            //                dispatch_async(dispatch_get_main_queue(),{
            //                    self.tableView?.reloadData()
            //                })
            //            }
            
            let userObject: AnyObject = json[0].object
            self.items.addObject(userObject)
            dispatch_async(dispatch_get_main_queue(),{
                self.tableView?.reloadData()
            })
        }
    }
    
    /*func loadSampleUsers(){
        users += ["Siva","Rubesh","Bharath"]
    }*/
    
    override func viewDidLoad() {
        super.viewDidLoad()
        addDummyData()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Table view data source
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.items.count
    }
    
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cellIdentifier = "TTUserTableViewCell"
        let cell = tableView.dequeueReusableCellWithIdentifier(cellIdentifier, forIndexPath: indexPath) as! TTUserTableViewCell
        let user:JSON = JSON(self.items[indexPath.row])
        cell.username.text = user["name"].string
        //let username = users[indexPath.row]
        //cell.username.text = username
        return cell
    }
}
