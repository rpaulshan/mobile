//
//  TTUserTableViewCell.swift
//  TimeTracker3
//
//  Created by Bharath Sundararaman on 1/19/16.
//  Copyright © 2016 Startup. All rights reserved.
//

import UIKit

class TTUserTableViewCell: UITableViewCell {

   
    @IBOutlet weak var username: UITextField!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
