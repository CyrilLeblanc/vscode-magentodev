import { PhpClassTemplateData } from "./class";

export type PhpObserverTemplateData = {} & PhpClassTemplateData;

export default (data: PhpObserverTemplateData) => `<?php

namespace ${data.namespace};

use Magento\\Framework\\Event\\Observer;
use Magento\\Framework\\Event\\ObserverInterface;

class ${data.className} implements ObserverInterface
{
    /**
     * @inheritdoc
     */
    public function execute(Observer $observer): void 
    {
        //Your observer code
    }
}
`;
