import torch # pip install torch torchvision
import torch.nn as nn


class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(NeuralNet, self).__init__()
        self.l1 = nn.Linear(input_size, hidden_size) 
        self.l2 = nn.Linear(hidden_size, hidden_size) 
        self.l3 = nn.Linear(hidden_size, num_classes)
        self.relu = nn.ReLU()
    
    def forward(self, x):
        out = self.l1(x)
        out = self.relu(out)
        out = self.l2(out)
        out = self.relu(out)
        out = self.l3(out)
        # no activation and no softmax at the end
        return out


# Importing Libraries:
# The code starts by importing the necessary libraries. torch is the main PyTorch library, and torch.nn contains the neural network-related modules.

# Defining the NeuralNet Class:
# A custom neural network class called NeuralNet is defined by inheriting from nn.Module, which is the base class for all PyTorch models.

# Constructor (__init__):
# The constructor initializes the neural network's architecture. It takes three arguments:

# input_size: The number of input features for each data point.
# hidden_size: The number of neurons in the hidden layers.
# num_classes: The number of output classes for classification.
# Within the constructor, the following layers and operations are defined:

# self.l1: The first linear (fully connected) layer with input_size input features and hidden_size output features.
# self.l2: The second linear layer with hidden_size input features and hidden_size output features.
# self.l3: The third linear layer with hidden_size input features and num_classes output features.
# self.relu: An instance of the Rectified Linear Unit (ReLU) activation function, which introduces non-linearity between the linear layers.
# Forward Method:
# The forward method defines the forward pass of the neural network, specifying how input data flows through the network's layers.

# out = self.l1(x): The input data x is passed through the first linear layer.
# out = self.relu(out): The ReLU activation function is applied element-wise to the output of the first linear layer.
# out = self.l2(out): The output from the ReLU activation is passed through the second linear layer.
# out = self.relu(out): Another ReLU activation is applied to the output of the second linear layer.
# out = self.l3(out): The output from the second ReLU activation is passed through the third linear layer.
# Finally, the result of the third linear layer (logits) is returned as the output of the forward pass. Note that there is no activation function (like softmax) applied to the output, which implies that this network can be used for multi-class classification where the final activation and loss calculation would be applied externally.